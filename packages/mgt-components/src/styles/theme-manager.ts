/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import {
  accentBaseColor,
  baseLayerLuminance,
  neutralBaseColor,
  StandardLuminance,
  SwatchRGB
} from '@fluentui/web-components';
// @microsoft/fast-colors is a transitive dependency of @fluentui/web-components, no need to explicitly add it to package.json
import { parseColorHexRGB } from '@microsoft/fast-colors';

/**
 * Available predefined themes
 */
type Theme = 'light' | 'dark' | 'default' | 'contrast';

/**
 * Helper function to apply fluent ui theme to an element
 *
 * @export
 * @param {Theme} theme - theme name, if an unknown theme is provided, the light theme will be applied
 * @param {HTMLElement} [element=document.body]
 */
export const applyTheme = (theme: Theme, element: HTMLElement = document.body): void => {
  const settings = getThemeSettings(theme);
  applyColorScheme(settings, element);
};

/**
 * Simple data holder for theme settings
 */
type ColorScheme = {
  /**
   * Hex color string for accent base color
   *
   * @type {string}
   */
  accentBaseColor: string;
  /**
   * Hex color string for neutral base color
   *
   * @type {string}
   */
  neutralBaseColor: string;
  /**
   * Base layer luminance for the theme
   * in the range of 0 to 1
   *
   * @type {number}
   */
  baseLayerLuminance: number;

  designTokenOverrides?: Record<string, string>;
};

/**
 * Helper function to apply fluent ui color scheme to an element
 *
 * @param {ColorScheme} settings
 * @param {HTMLElement} [element=document.body]
 */
const applyColorScheme = (settings: ColorScheme, element: HTMLElement = document.body): void => {
  accentBaseColor.setValueFor(element, SwatchRGB.from(parseColorHexRGB(settings.accentBaseColor)));
  neutralBaseColor.setValueFor(element, SwatchRGB.from(parseColorHexRGB(settings.neutralBaseColor)));
  baseLayerLuminance.setValueFor(element, settings.baseLayerLuminance);
  // put this work on the macro queue so that it happens after promise based/reactive work of setting the base colors above
  if (settings.designTokenOverrides) {
    setTimeout(() => {
      Object.entries(settings.designTokenOverrides).forEach(([key, value]) => {
        element.style.setProperty(key, value);
      });
    });
  }
};

/**
 * Helper function to translate theme name to theme settings
 *
 * @param {Theme} theme
 * @return {*}  {ThemeSettings}
 */
const getThemeSettings = (theme: Theme): ColorScheme => {
  switch (theme) {
    case 'contrast':
      return {
        accentBaseColor: '#7f85f5',
        neutralBaseColor: '#adadad',
        baseLayerLuminance: StandardLuminance.DarkMode
      };
    case 'default': // this is the Teams light theme
      return {
        accentBaseColor: '#5b5fc7',
        neutralBaseColor: '#616161',
        baseLayerLuminance: StandardLuminance.LightMode
      };
    case 'dark': // Both MGT default dark and Teams Dark theme
      return {
        accentBaseColor: '#479ef5',
        neutralBaseColor: '#adadad',
        baseLayerLuminance: StandardLuminance.DarkMode,
        designTokenOverrides: {
          '--neutral-layer-card-container': '#292929',
          '--neutral-layer-floating': '#292929',
          '--accent-fill-rest': '#479EF5',
          '--accent-fill-hover': '#62ABF5',
          '--accent-fill-active': '#479EF5',
          '--accent-fill-focus': '#479EF5',
          '--accent-foreground-rest': '#479EF5',
          '--accent-foreground-hover': '#62ABF5',
          '--accent-foreground-active': '#479EF5',
          '--accent-foreground-focus': '#EBF3FC',
          '--accent-stroke-control-rest': 'linear-gradient(#479EF5 90%, #479ef5 100%)',
          '--accent-stroke-control-hover': 'linear-gradient(#62ABF5 90%, #115EA3 100%)',
          '--accent-stroke-control-active': '#479EF5',
          '--accent-stroke-control-focus': 'linear-gradient(#EBF3FC 90%, #479ef5 100%)',
          '--neutral-foreground-hint': '#666666',
          '--neutral-stroke-rest': '#666666',
          '--neutral-stroke-hover': '#636363',
          '--neutral-stroke-active': '#6b6b6b',
          '--neutral-stroke-focus': '#707070',
          '--neutral-stroke-layer-rest': '#666666',
          '--neutral-stroke-layer-hover': '#383838',
          '--neutral-stroke-layer-active': '#383838',
          '--neutral-stroke-strong-rest': '#666666',
          '--neutral-stroke-strong-hover': '#636363',
          '--neutral-stroke-strong-active': '#6b6b6b',
          '--neutral-stroke-strong-focus': '#707070'
        }
      };
    case 'light':
    default:
      return {
        accentBaseColor: '#0f6cbd',
        neutralBaseColor: '#616161',
        baseLayerLuminance: StandardLuminance.LightMode
      };
  }
};