/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { BetaGraph, IGraph, Providers, createFromProvider, error, log } from '@microsoft/mgt-element';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  IHttpConnectionOptions,
  LogLevel
} from '@microsoft/signalr';
import { ThreadEventEmitter } from './ThreadEventEmitter';
import type {
  Entity,
  Subscription,
  ChatMessage,
  Chat,
  AadUserConversationMember
} from '@microsoft/microsoft-graph-types';
import { GraphConfig } from './GraphConfig';
import { SubscriptionsCache } from './Caching/SubscriptionCache';
import { Timer } from '../utils/Timer';
import { getOrGenerateGroupId } from './getOrGenerateGroupId';
import { v4 as uuid } from 'uuid';

export const appSettings = {
  defaultSubscriptionLifetimeInMinutes: 10,
  renewalThreshold: 75, // The number of seconds before subscription expires it will be renewed
  renewalTimerInterval: 20, // The number of seconds between executions of the renewal timer
  removalThreshold: 1 * 60, // number of seconds after the last update of a subscription to consider in inactive
  removalTimerInterval: 1 * 60, // the number of seconds between executions of the timer to remove inactive subscriptions
  useCanary: GraphConfig.useCanary
};

type ChangeTypes = 'created' | 'updated' | 'deleted';

interface Notification<T extends Entity> {
  subscriptionId: string;
  changeType: ChangeTypes;
  resource: string;
  resourceData: T & {
    id: string;
    '@odata.type': string;
    '@odata.id': string;
  };
  EncryptedContent: string;
}

type ReceivedNotification = Notification<Chat> | Notification<ChatMessage> | Notification<AadUserConversationMember>;

const isMessageNotification = (o: Notification<Entity>): o is Notification<ChatMessage> =>
  o.resource.includes('/messages(');
const isMembershipNotification = (o: Notification<Entity>): o is Notification<AadUserConversationMember> =>
  o.resource.includes('/members');

export class GraphNotificationClient {
  private readonly instanceId = uuid();
  private connection?: HubConnection = undefined;
  private wasConnected?: boolean | undefined;
  private renewalTimeout?: string;
  private cleanupTimeout?: string;
  private renewalCount = 0;
  private chatId = '';
  private sessionId = '';
  private lastNotificationUrl = '';

  private readonly subscriptionCache: SubscriptionsCache = new SubscriptionsCache();
  private readonly timer = new Timer();
  private get graph() {
    return this._graph;
  }
  private get beta() {
    return this._graph ? BetaGraph.fromGraph(this._graph) : undefined;
  }
  private get subscriptionGraph() {
    return GraphConfig.useCanary
      ? createFromProvider(Providers.globalProvider, GraphConfig.canarySubscriptionVersion, 'mgt-chat')
      : this.beta;
  }

  /**
   *
   */
  constructor(
    private readonly emitter: ThreadEventEmitter,
    private readonly _graph: IGraph | undefined
  ) {
    // start the cleanup timer when we create the notification client.
    this.startCleanupTimer();
  }

  /**
   * Removes any active timers that may exist to prevent memory leaks and perf issues.
   * Call this method when the component that depends an instance of this class is being removed from the DOM
   */
  public tearDown() {
    log('cleaning up graph notification resources');
    if (this.cleanupTimeout) this.timer.clearTimeout(this.cleanupTimeout);
    if (this.renewalTimeout) this.timer.clearTimeout(this.renewalTimeout);
    this.timer.close();
  }

  private readonly getToken = async () => {
    const token = await Providers.globalProvider.getAccessToken();
    if (!token) throw new Error('Could not retrieve token for user');
    return token;
  };

  // TODO: understand if this is needed under the native model
  private readonly onReconnect = (connectionId: string | undefined) => {
    log(`Reconnected. ConnectionId: ${connectionId || 'undefined'}`);
    // void this.renewChatSubscriptions();
  };

  private readonly receiveNotificationMessage = (message: string) => {
    if (typeof message !== 'string') throw new Error('Expected string from receivenotificationmessageasync');

    const notification: ReceivedNotification = JSON.parse(message) as ReceivedNotification;
    log('received notification message', notification);
    const emitter: ThreadEventEmitter | undefined = this.emitter;
    if (!notification.resourceData) throw new Error('Message did not contain resourceData');
    if (isMessageNotification(notification)) {
      this.processMessageNotification(notification, emitter);
    } else if (isMembershipNotification(notification)) {
      this.processMembershipNotification(notification, emitter);
    } else {
      this.processChatPropertiesNotification(notification, emitter);
    }
    // Need to return a status code string of 200 so that graph knows the message was received and doesn't re-send the notification
    const ackMessage: unknown = { StatusCode: '200' };
    return GraphConfig.ackAsString ? JSON.stringify(ackMessage) : ackMessage;
  };

  private processMessageNotification(notification: Notification<ChatMessage>, emitter: ThreadEventEmitter | undefined) {
    const message = notification.resourceData;

    switch (notification.changeType) {
      case 'created':
        emitter?.chatMessageReceived(message);
        return;
      case 'updated':
        emitter?.chatMessageEdited(message);
        return;
      case 'deleted':
        emitter?.chatMessageDeleted(message);
        return;
      default:
        throw new Error('Unknown change type');
    }
  }

  private processMembershipNotification(
    notification: Notification<AadUserConversationMember>,
    emitter: ThreadEventEmitter | undefined
  ) {
    const member = notification.resourceData;
    switch (notification.changeType) {
      case 'created':
        emitter?.participantAdded(member);
        return;
      case 'deleted':
        emitter?.participantRemoved(member);
        return;
      default:
        throw new Error('Unknown change type');
    }
  }

  private processChatPropertiesNotification(notification: Notification<Chat>, emitter: ThreadEventEmitter | undefined) {
    const chat = notification.resourceData;
    switch (notification.changeType) {
      case 'updated':
        emitter?.chatThreadPropertiesUpdated(chat);
        return;
      case 'deleted':
        emitter?.chatThreadDeleted(chat);
        return;
      default:
        throw new Error('Unknown change type');
    }
  }

  private readonly cacheSubscription = async (subscriptionRecord: Subscription): Promise<void> => {
    log(subscriptionRecord);
    await this.subscriptionCache.cacheSubscription(this.chatId, subscriptionRecord);
  };

  private async subscribeToResource(resourcePath: string, changeTypes: ChangeTypes[]) {
    // build subscription request
    const expirationDateTime = new Date(
      new Date().getTime() + appSettings.defaultSubscriptionLifetimeInMinutes * 60 * 1000
    ).toISOString();
    const subscriptionDefinition: Subscription = {
      changeType: changeTypes.join(','),
      notificationUrl: `${GraphConfig.webSocketsPrefix}?groupId=${getOrGenerateGroupId(this.chatId)}`,
      resource: resourcePath,
      expirationDateTime,
      includeResourceData: true,
      clientState: 'wsssecret'
    };

    log(`subscribing to changes for ${resourcePath}`);
    const subscriptionEndpoint = GraphConfig.subscriptionEndpoint;
    const subscriptionGraph = this.subscriptionGraph;

    if (!subscriptionGraph) return;
    // send subscription POST to Graph
    let subscription: Subscription;
    try {
      subscription = (await subscriptionGraph.api(subscriptionEndpoint).post(subscriptionDefinition)) as Subscription;
    } catch (error) {
      throw error;
    }
    if (!subscription?.notificationUrl) throw new Error('Subscription not created');
    log(subscription);

    log('Invoked CreateSubscription');
    return subscription;
  }

  public renewSubscription = async (subscriptionId: string): Promise<void> => {
    log(`Renewing Graph subscription for ChatId. RenewalCount: ${this.renewalCount}.`);

    const newExpirationTime = new Date(
      new Date().getTime() + appSettings.defaultSubscriptionLifetimeInMinutes * 60 * 1000
    );

    const expirationDateTime = newExpirationTime.toISOString();
    const renewedSubscription = (await this.graph?.api(`${GraphConfig.subscriptionEndpoint}/${subscriptionId}`).patch({
      expirationDateTime
    })) as Subscription | undefined;
    if (renewedSubscription) {
      this.renewalCount++;
      return this.cacheSubscription(renewedSubscription);
    }
  };

  public async createSignalRConnection(notificationUrl: string) {
    const connectionOptions: IHttpConnectionOptions = {
      accessTokenFactory: this.getToken,
      withCredentials: false
    };
    const connection = new HubConnectionBuilder()
      .withUrl(GraphConfig.adjustNotificationUrl(notificationUrl, this.sessionId), connectionOptions)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.onreconnected(this.onReconnect);

    connection.on('receivenotificationmessageasync', this.receiveNotificationMessage);

    connection.on('EchoMessage', log);

    this.connection = connection;
    try {
      await connection.start();
      log(connection);
    } catch (e) {
      error('An error occurred connecting to the notification web socket', e);
    }
  }

  private async deleteSubscription(id: string) {
    try {
      await this.graph?.api(`${GraphConfig.subscriptionEndpoint}/${id}`).delete();
    } catch (e) {
      error(e);
    }
  }

  private async removeSubscriptions(subscriptions: Subscription[]): Promise<unknown[]> {
    const tasks: Promise<unknown>[] = [];
    for (const s of subscriptions) {
      // if there is no id or the subscription is expired, skip
      if (!s.id || (s.expirationDateTime && new Date(s.expirationDateTime) <= new Date())) continue;
      tasks.push(this.deleteSubscription(s.id));
    }
    return Promise.all(tasks);
  }

  private startCleanupTimer() {
    this.cleanupTimeout = this.timer.setTimeout(
      'renewal:' + this.instanceId,
      this.cleanupTimerSync,
      appSettings.removalTimerInterval * 1000
    );
  }

  private readonly cleanupTimerSync = () => {
    void this.cleanupTimer();
  };

  // used to remove inactive chatId subscriptions (different from the renewal timer, which renews active subscriptions)
  private readonly cleanupTimer = async () => {
    log(`running cleanup timer`);
    const offset = Math.min(
      appSettings.removalThreshold * 1000,
      appSettings.defaultSubscriptionLifetimeInMinutes * 60 * 1000
    );
    const threshold = new Date(new Date().getTime() - offset).toISOString();
    const inactiveSubs = await this.subscriptionCache.loadInactiveSubscriptions(threshold);
    let tasks: Promise<unknown>[] = [];
    for (const inactive of inactiveSubs) {
      tasks.push(this.removeSubscriptions(inactive.subscriptions));
    }
    await Promise.all(tasks);
    tasks = [];
    for (const inactive of inactiveSubs) {
      tasks.push(this.subscriptionCache.deleteCachedSubscriptions(inactive.chatId));
    }
    this.startCleanupTimer();
  };

  private createSubscriptions = async (chatId: string) => {
    const promises: Promise<Subscription | undefined>[] = [];
    promises.push(this.subscribeToResource(`/chats/${chatId}/messages`, ['created', 'updated', 'deleted']));
    promises.push(this.subscribeToResource(`/chats/${chatId}/members`, ['created', 'deleted']));
    promises.push(this.subscribeToResource(`/chats/${chatId}`, ['updated', 'deleted']));
    const results = await Promise.all(promises);

    // Cache the subscriptions in storage for re-hydration on page refreshes
    const awaits: Promise<void>[] = [];
    const subscriptions: Subscription[] = (results as (Subscription | undefined)[]).filter(Boolean) as Subscription[];
    for (let subscription of subscriptions) {
      awaits.push(this.cacheSubscription(subscription));
    }
    await Promise.all(awaits);

    return subscriptions;
  };

  private async deleteCachedSubscriptions(chatId: string) {
    try {
      log('Removing all chat subscriptions from cache for chatId:', chatId);
      await this.subscriptionCache.deleteCachedSubscriptions(chatId);
      log('Successfully removed all chat subscriptions from cache.');
    } catch (e) {
      error(`Failed to remove chat subscription for ${chatId} from cache.`, e);
    }
  }

  private async getSubscriptions(chatId: string): Promise<Subscription[] | undefined> {
    const subscriptions = (await this.subscriptionCache.loadSubscriptions(chatId))?.subscriptions || [];
    return subscriptions.length > 0 ? subscriptions : undefined;
  }

  private trySwitchToConnected() {
    if (this.wasConnected !== true) {
      log('The user will receive notifications from the chat subscriptions.');
      this.wasConnected = true;
      this.emitter?.connected();
    }
  }

  private trySwitchToDisconnected(ignoreIfUndefined = false) {
    if (ignoreIfUndefined && this.wasConnected === undefined) return;
    if (this.wasConnected !== false) {
      log('The user will NOT receive notifications from the chat subscriptions.');
      this.wasConnected = false;
      this.emitter?.disconnected();
    }
  }

  private readonly renewalSync = () => {
    void this.renewal();
  };

  private readonly renewal = async () => {
    let nextRenewalTimeInSec = appSettings.renewalTimerInterval;
    try {
      // if there are current subscriptions for this chat id...
      let subscriptions = await this.getSubscriptions(this.chatId);
      if (subscriptions) {
        // attempt a renewal if necessary
        const existingSubscriptionIds = subscriptions?.map(s => s?.id).filter(Boolean);
        try {
          for (let subscription of subscriptions) {
            const expirationTime = new Date(subscription.expirationDateTime!);
            const diff = Math.round((expirationTime.getTime() - new Date().getTime()) / 1000);
            if (diff <= 0) {
              log(`Renewing chat subscription ${subscription.id} that has already expired...`);
              this.trySwitchToDisconnected(true);
              await this.renewSubscription(subscription.id!);
              log(`Successfully renewed chat subscription ${subscription.id}.`);
            } else if (diff <= appSettings.renewalThreshold) {
              log(`Renewing chat subscription ${subscription.id} that will expire in ${diff} seconds...`);
              await this.renewSubscription(subscription.id!);
              log(`Successfully renewed chat subscription ${subscription.id}.`);
            }
          }
        } catch (e) {
          error(`Failed to renew subscriptions for ${existingSubscriptionIds}.`, e);
          await this.deleteCachedSubscriptions(this.chatId);
          subscriptions = undefined;
        }
      }

      // if there are no subscriptions, try to create them
      if (!subscriptions) {
        try {
          this.trySwitchToDisconnected(true);
          subscriptions = await this.createSubscriptions(this.chatId);
        } catch (e) {
          const err = e as { statusCode?: number; message: string };
          if (err.statusCode === 403 && err.message.indexOf('has reached its limit') > 0) {
            // if the limit is reached, back-off (NOTE: this should probably be a 429)
            nextRenewalTimeInSec = appSettings.renewalTimerInterval * 3;
            throw new Error(
              `Failed to create new subscriptions due to a limitation; retrying in ${nextRenewalTimeInSec} seconds: ${err.message}.`
            );
          } else if (err.statusCode === 403 || err.statusCode === 402) {
            // permanent error, stop renewal
            error('Failed to create new subscriptions due to a permanent condition; stopping renewals.', e);
            return; // exit without setting the next renewal timer
          } else {
            // transient error, retry
            throw new Error(
              `Failed to create new subscriptions due to a transient condition; retrying in ${nextRenewalTimeInSec} seconds: ${err.message}.`
            );
          }
        }
      }

      // create or reconnect the SignalR connection
      // notificationUrl comes in the form of websockets:https://graph.microsoft.com/beta/subscriptions/notificationChannel/websockets/<Id>?groupid=<UserId>&sessionid=default
      // if <Id> changes, we need to create a new connection
      const subscriptionIds = subscriptions?.map(s => s?.id).filter(Boolean);
      if (this.connection?.state === HubConnectionState.Connected) {
        await this.connection?.send('ping'); // ensure the connection is still alive
      }
      if (!this.connection) {
        log(`Creating a new SignalR connection for subscriptions: ${subscriptionIds}...`);
        this.trySwitchToDisconnected(true);
        this.lastNotificationUrl = subscriptions![0]?.notificationUrl!;
        await this.createSignalRConnection(subscriptions![0]?.notificationUrl!);
        log(`Successfully created a new SignalR connection for subscriptions: ${subscriptionIds}`);
      } else if (this.connection.state !== HubConnectionState.Connected) {
        log(`Reconnecting SignalR connection for subscriptions: ${subscriptionIds}...`);
        this.trySwitchToDisconnected(true);
        await this.connection.start();
        log(`Successfully reconnected SignalR connection for subscriptions: ${subscriptionIds}`);
      } else if (this.lastNotificationUrl !== subscriptions![0]?.notificationUrl) {
        log(`Updating SignalR connection for subscriptions: ${subscriptionIds} due to new notification URL...`);
        this.trySwitchToDisconnected(true);
        await this.closeSignalRConnection();
        this.lastNotificationUrl = subscriptions![0]?.notificationUrl!;
        await this.createSignalRConnection(subscriptions![0]?.notificationUrl!);
        log(`Successfully updated SignalR connection for subscriptions: ${subscriptionIds}`);
      }

      // emit the new connection event if necessary
      this.trySwitchToConnected();
    } catch (e) {
      error('Error in chat subscription connection process.', e);
      this.trySwitchToDisconnected();
    }
    this.renewalTimeout = this.timer.setTimeout(
      'renewal:' + this.instanceId,
      this.renewalSync,
      nextRenewalTimeInSec * 1000
    );
  };

  public async closeSignalRConnection() {
    // stop the connection and set it to undefined so it will reconnect when next subscription is created.
    await this.connection?.stop();
    this.connection = undefined;
  }

  public async subscribeToChatNotifications(chatId: string, sessionId: string) {
    log(`Chat subscription with chat id: ${chatId} and session id: ${sessionId}`);
    this.wasConnected = undefined;
    this.chatId = chatId;
    this.sessionId = sessionId;
    this.renewalTimeout = this.timer.setTimeout('renewal:' + this.instanceId, this.renewalSync, 0);
  }
}
