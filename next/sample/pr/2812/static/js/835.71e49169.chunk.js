"use strict";(self.webpackChunkreact_contoso=self.webpackChunkreact_contoso||[]).push([[835],{7940:function(n,e,t){t.d(e,{g:function(){return T}});var i=t(9249),r=t(7371),o=t(5754),a=t(6906),l=t(6647),c=t(9604),d=t(9763),s=t(7450),u=t(5453),h=function(n){(0,o.Z)(t,n);var e=(0,a.Z)(t);function t(){return(0,i.Z)(this,t),e.apply(this,arguments)}return(0,r.Z)(t)}(t(9350).I),p=function(n){(0,o.Z)(t,n);var e=(0,a.Z)(t);function t(){var n;return(0,i.Z)(this,t),(n=e.apply(this,arguments)).proxy=document.createElement("input"),n}return(0,r.Z)(t)}((0,u.V2)(h)),f=function(n){(0,o.Z)(t,n);var e=(0,a.Z)(t);function t(){var n;return(0,i.Z)(this,t),(n=e.call(this)).initialValue="on",n.indeterminate=!1,n.keypressHandler=function(e){if(!n.readOnly&&e.key===s.BI)n.indeterminate&&(n.indeterminate=!1),n.checked=!n.checked},n.clickHandler=function(e){n.disabled||n.readOnly||(n.indeterminate&&(n.indeterminate=!1),n.checked=!n.checked)},n.proxy.setAttribute("type","checkbox"),n}return(0,r.Z)(t,[{key:"readOnlyChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}}]),t}(p);(0,l.gn)([(0,c.Lj)({attribute:"readonly",mode:"boolean"})],f.prototype,"readOnly",void 0),(0,l.gn)([d.LO],f.prototype,"defaultSlottedNodes",void 0),(0,l.gn)([d.LO],f.prototype,"indeterminate",void 0);var v,y,b,g=t(1171),m=t(982),k=t(2474),x=t(3032),H=t(4047),Z=t(5161),L=t(2607),A=t(4101),_=t(287),C=t(8697),w=t(2132),I=t(1116),O=t(7960),T=f.compose({baseName:"checkbox",template:function(n,e){return(0,m.d)(v||(v=(0,g.Z)(['\n    <template\n        role="checkbox"\n        aria-checked="','"\n        aria-required="','"\n        aria-disabled="','"\n        aria-readonly="','"\n        tabindex="','"\n        @keypress="','"\n        @click="','"\n        class="'," "," ",'"\n    >\n        <div part="control" class="control">\n            <slot name="checked-indicator">\n                ','\n            </slot>\n            <slot name="indeterminate-indicator">\n                ','\n            </slot>\n        </div>\n        <label\n            part="label"\n            class="','"\n        >\n            <slot ',"></slot>\n        </label>\n    </template>\n"])),(function(n){return n.checked}),(function(n){return n.required}),(function(n){return n.disabled}),(function(n){return n.readOnly}),(function(n){return n.disabled?null:0}),(function(n,e){return n.keypressHandler(e.event)}),(function(n,e){return n.clickHandler(e.event)}),(function(n){return n.readOnly?"readonly":""}),(function(n){return n.checked?"checked":""}),(function(n){return n.indeterminate?"indeterminate":""}),e.checkedIndicator||"",e.indeterminateIndicator||"",(function(n){return n.defaultSlottedNodes&&n.defaultSlottedNodes.length?"label":"label label__hidden"}),(0,k.Q)("defaultSlottedNodes"))},styles:function(n,e){return(0,x.i)(y||(y=(0,g.Z)(["\n    "," :host {\n      align-items: center;\n      outline: none;\n      "," user-select: none;\n    }\n\n    .control {\n      position: relative;\n      width: calc(("," / 2 + ",") * 1px);\n      height: calc(("," / 2 + ",") * 1px);\n      box-sizing: border-box;\n      border-radius: calc("," * 1px);\n      border: calc("," * 1px) solid ",";\n      background: ",";\n      cursor: pointer;\n    }\n\n    .label__hidden {\n      display: none;\n      visibility: hidden;\n    }\n\n    .label {\n      ","\n      color: ",";\n      "," padding-inline-start: calc("," * 2px + 2px);\n      margin-inline-end: calc("," * 2px + 2px);\n      cursor: pointer;\n    }\n\n    slot[name='checked-indicator'],\n    slot[name='indeterminate-indicator'] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 100%;\n      height: 100%;\n      fill: ",";\n      opacity: 0;\n      pointer-events: none;\n    }\n\n    slot[name='indeterminate-indicator'] {\n      position: absolute;\n      top: 0;\n    }\n\n    :host(.checked) slot[name='checked-indicator'],\n    :host(.checked) slot[name='indeterminate-indicator'] {\n      fill: ",";\n    }\n\n    :host(:not(.disabled):hover) .control {\n      background: ",";\n      border-color: ",";\n    }\n\n    :host(:not(.disabled):active) .control {\n      background: ",";\n      border-color: ",";\n    }\n\n    :host(:",") .control {\n      background: ",";\n      ","\n    }\n\n    :host(.checked) .control {\n      background: ",";\n      border-color: transparent;\n    }\n\n    :host(.checked:not(.disabled):hover) .control {\n      background: ",";\n      border-color: transparent;\n    }\n\n    :host(.checked:not(.disabled):active) .control {\n      background: ",";\n      border-color: transparent;\n    }\n\n    :host(.disabled) .label,\n    :host(.readonly) .label,\n    :host(.readonly) .control,\n    :host(.disabled) .control {\n      cursor: ",";\n    }\n\n    :host(.checked:not(.indeterminate)) slot[name='checked-indicator'],\n    :host(.indeterminate) slot[name='indeterminate-indicator'] {\n      opacity: 1;\n    }\n\n    :host(.disabled) {\n      opacity: ",";\n    }\n  "])),(0,H.j)("inline-flex"),"",C.i,w._5n,C.i,w._5n,w.UWU,w.Han,w.rU8,w.pB6,I.cX,w.CHi,"",w._5n,w._5n,w.CHi,w.w41,w.vFq,w.gKw,w.bWE,w.ekh,Z.b,w.W3V,O.H,w.Avx,w.OCG,w.UEO,L.H,w.VFZ).withBehaviors((0,A.vF)((0,x.i)(b||(b=(0,g.Z)(["\n        .control {\n          border-color: ",";\n          background: ",";\n        }\n        :host(:not(.disabled):hover) .control,\n        :host(:not(.disabled):active) .control {\n          border-color: ",";\n          background: ",";\n        }\n        slot[name='checked-indicator'],\n        slot[name='indeterminate-indicator'] {\n          fill: ",";\n        }\n        :host(:",") .control {\n          forced-color-adjust: none;\n          outline-color: ",";\n          background: ",";\n          border-color: ",";\n        }\n        :host(.checked) .control {\n          background: ",";\n          border-color: ",";\n        }\n        :host(.checked:not(.disabled):hover) .control,\n        :host(.checked:not(.disabled):active) .control {\n          background: ",";\n          border-color: ",";\n        }\n        :host(.checked) slot[name='checked-indicator'],\n        :host(.checked) slot[name='indeterminate-indicator'] {\n          fill: ",";\n        }\n        :host(.checked:hover ) .control slot[name='checked-indicator'],\n        :host(.checked:hover ) .control slot[name='indeterminate-indicator'] {\n          fill: ",";\n        }\n        :host(.disabled) {\n          opacity: 1;\n        }\n        :host(.disabled) .control {\n          border-color: ",";\n          background: ",";\n        }\n        :host(.disabled) slot[name='checked-indicator'],\n        :host(.checked.disabled:hover) .control slot[name='checked-indicator'],\n        :host(.disabled) slot[name='indeterminate-indicator'],\n        :host(.checked.disabled:hover) .control slot[name='indeterminate-indicator'] {\n          fill: ",";\n        }\n      "])),_.H.FieldText,_.H.Field,_.H.Highlight,_.H.Field,_.H.FieldText,Z.b,_.H.FieldText,_.H.Field,_.H.Highlight,_.H.Highlight,_.H.Highlight,_.H.HighlightText,_.H.Highlight,_.H.HighlightText,_.H.Highlight,_.H.GrayText,_.H.Field,_.H.GrayText)))},checkedIndicator:'\n    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M13.86 3.66a.5.5 0 01-.02.7l-7.93 7.48a.6.6 0 01-.84-.02L2.4 9.1a.5.5 0 01.72-.7l2.4 2.44 7.65-7.2a.5.5 0 01.7.02z"/>\n    </svg>\n  ',indeterminateIndicator:'\n    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\n      <path d="M3 8c0-.28.22-.5.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 8z"/>\n    </svg>\n  '})},9586:function(n,e,t){t.d(e,{i0:function(){return N}});var i=t(9249),r=t(7371),o=t(3069),a=t(5058),l=t(5754),c=t(6906),d=t(2296),s=t(9604),u=t(6647),h=t(3369),p=t(9763),f=t(7534),v=t(8780),y=t(4413),b=t(5453),g=function(n){(0,l.Z)(t,n);var e=(0,c.Z)(t);function t(){return(0,i.Z)(this,t),e.apply(this,arguments)}return(0,r.Z)(t)}(t(9350).I),m=function(n){(0,l.Z)(t,n);var e=(0,c.Z)(t);function t(){var n;return(0,i.Z)(this,t),(n=e.apply(this,arguments)).proxy=document.createElement("input"),n}return(0,r.Z)(t)}((0,b.Um)(g)),k="text",x=function(n){(0,l.Z)(t,n);var e=(0,c.Z)(t);function t(){var n;return(0,i.Z)(this,t),(n=e.apply(this,arguments)).type=k,n}return(0,r.Z)(t,[{key:"readOnlyChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}},{key:"autofocusChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}},{key:"placeholderChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}},{key:"typeChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type,this.validate())}},{key:"listChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}},{key:"maxlengthChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}},{key:"minlengthChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}},{key:"patternChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}},{key:"sizeChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}},{key:"spellcheckChanged",value:function(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}},{key:"connectedCallback",value:function(){var n=this;(0,o.Z)((0,a.Z)(t.prototype),"connectedCallback",this).call(this),this.proxy.setAttribute("type",this.type),this.validate(),this.autofocus&&h.SO.queueUpdate((function(){n.focus()}))}},{key:"select",value:function(){this.control.select(),this.$emit("select")}},{key:"handleTextInput",value:function(){this.value=this.control.value}},{key:"handleChange",value:function(){this.$emit("change")}},{key:"validate",value:function(){(0,o.Z)((0,a.Z)(t.prototype),"validate",this).call(this,this.control)}}]),t}(m);(0,u.gn)([(0,s.Lj)({attribute:"readonly",mode:"boolean"})],x.prototype,"readOnly",void 0),(0,u.gn)([(0,s.Lj)({mode:"boolean"})],x.prototype,"autofocus",void 0),(0,u.gn)([s.Lj],x.prototype,"placeholder",void 0),(0,u.gn)([s.Lj],x.prototype,"type",void 0),(0,u.gn)([s.Lj],x.prototype,"list",void 0),(0,u.gn)([(0,s.Lj)({converter:s.Id})],x.prototype,"maxlength",void 0),(0,u.gn)([(0,s.Lj)({converter:s.Id})],x.prototype,"minlength",void 0),(0,u.gn)([s.Lj],x.prototype,"pattern",void 0),(0,u.gn)([(0,s.Lj)({converter:s.Id})],x.prototype,"size",void 0),(0,u.gn)([(0,s.Lj)({mode:"boolean"})],x.prototype,"spellcheck",void 0),(0,u.gn)([p.LO],x.prototype,"defaultSlottedNodes",void 0);var H=(0,r.Z)((function n(){(0,i.Z)(this,n)}));(0,y.e)(H,f.v),(0,y.e)(x,v.hW,H);var Z,L,A=t(1171),_=t(982),C=t(2474),w=t(3025),I=t(8586),O=t(3032),T=t(4047),$=t(4101),E=t(9351),M=t(1806),j=t(2132),F=".root",S=function(n){(0,l.Z)(t,n);var e=(0,c.Z)(t);function t(){return(0,i.Z)(this,t),e.apply(this,arguments)}return(0,r.Z)(t,[{key:"appearanceChanged",value:function(n,e){n!==e&&(this.classList.add(e),this.classList.remove(n))}},{key:"connectedCallback",value:function(){(0,o.Z)((0,a.Z)(t.prototype),"connectedCallback",this).call(this),this.appearance||(this.appearance="outline")}}]),t}(x);(0,d.gn)([s.Lj],S.prototype,"appearance",void 0);var N=S.compose({baseName:"text-field",baseClass:x,template:function(n,e){return(0,_.d)(Z||(Z=(0,A.Z)(['\n    <template\n        class="\n            ','\n        "\n    >\n        <label\n            part="label"\n            for="control"\n            class="','"\n        >\n            <slot\n                ','\n            ></slot>\n        </label>\n        <div class="root" part="root">\n            ','\n            <input\n                class="control"\n                part="control"\n                id="control"\n                @input="','"\n                @change="','"\n                ?autofocus="','"\n                ?disabled="','"\n                list="','"\n                maxlength="','"\n                minlength="','"\n                pattern="','"\n                placeholder="','"\n                ?readonly="','"\n                ?required="','"\n                size="','"\n                ?spellcheck="','"\n                :value="','"\n                type="','"\n                aria-atomic="','"\n                aria-busy="','"\n                aria-controls="','"\n                aria-current="','"\n                aria-describedby="','"\n                aria-details="','"\n                aria-disabled="','"\n                aria-errormessage="','"\n                aria-flowto="','"\n                aria-haspopup="','"\n                aria-hidden="','"\n                aria-invalid="','"\n                aria-keyshortcuts="','"\n                aria-label="','"\n                aria-labelledby="','"\n                aria-live="','"\n                aria-owns="','"\n                aria-relevant="','"\n                aria-roledescription="','"\n                ',"\n            />\n            ","\n        </div>\n    </template>\n"])),(function(n){return n.readOnly?"readonly":""}),(function(n){return n.defaultSlottedNodes&&n.defaultSlottedNodes.length?"label":"label label__hidden"}),(0,C.Q)({property:"defaultSlottedNodes",filter:I.E}),(0,v.m9)(n,e),(function(n){return n.handleTextInput()}),(function(n){return n.handleChange()}),(function(n){return n.autofocus}),(function(n){return n.disabled}),(function(n){return n.list}),(function(n){return n.maxlength}),(function(n){return n.minlength}),(function(n){return n.pattern}),(function(n){return n.placeholder}),(function(n){return n.readOnly}),(function(n){return n.required}),(function(n){return n.size}),(function(n){return n.spellcheck}),(function(n){return n.value}),(function(n){return n.type}),(function(n){return n.ariaAtomic}),(function(n){return n.ariaBusy}),(function(n){return n.ariaControls}),(function(n){return n.ariaCurrent}),(function(n){return n.ariaDescribedby}),(function(n){return n.ariaDetails}),(function(n){return n.ariaDisabled}),(function(n){return n.ariaErrormessage}),(function(n){return n.ariaFlowto}),(function(n){return n.ariaHaspopup}),(function(n){return n.ariaHidden}),(function(n){return n.ariaInvalid}),(function(n){return n.ariaKeyshortcuts}),(function(n){return n.ariaLabel}),(function(n){return n.ariaLabelledby}),(function(n){return n.ariaLive}),(function(n){return n.ariaOwns}),(function(n){return n.ariaRelevant}),(function(n){return n.ariaRoledescription}),(0,w.i)("control"),(0,v.LC)(n,e))},styles:function(n,e){return(0,O.i)(L||(L=(0,A.Z)(["\n    ","\n\n    ","\n\n    ","\n\n    .root {\n      display: flex;\n      flex-direction: row;\n    }\n\n    .control {\n      -webkit-appearance: none;\n      color: inherit;\n      background: transparent;\n      border: 0;\n      height: calc(100% - 4px);\n      margin-top: auto;\n      margin-bottom: auto;\n      padding: 0 calc("," * 2px + 1px);\n      font-family: inherit;\n      font-size: inherit;\n      line-height: inherit;\n    }\n\n    .start,\n    .end {\n      display: flex;\n      margin: auto;\n    }\n\n    .start {\n      display: flex;\n      margin-inline-start: 11px;\n    }\n\n    .end {\n      display: flex;\n      margin-inline-end: 11px;\n    }\n  "])),(0,T.j)("inline-block"),(0,E.sO)(n,e,F),(0,E.N7)(n,e,F),j._5n).withBehaviors((0,M.H)("outline",(0,E.hP)(n,e,F)),(0,M.H)("filled",(0,E.ZE)(n,e,F)),(0,$.vF)((0,E.xA)(n,e,F)))},shadowOptions:{delegatesFocus:!0}})},11:function(n,e,t){t.d(e,{r:function(){return k}});var i=t(6234),r=t(1361),o=t(9249),a=t(7371),l=t(1987),c=t(5754),d=t(6906),s=t(2302),u=t(9059),h=s.Al.I,p=function(){return document.createComment("")},f=function(n,e,t){var i,r=n._$AA.parentNode,o=void 0===e?n._$AB:e._$AA;if(void 0===t){var a=r.insertBefore(p(),o),l=r.insertBefore(p(),o);t=new h(a,l,n,n.options)}else{var c,d=t._$AB.nextSibling,s=t._$AM,u=s!==n;if(u)null===(i=t._$AQ)||void 0===i||i.call(t,n),t._$AM=n,void 0!==t._$AP&&(c=n._$AU)!==s._$AU&&t._$AP(c);if(d!==o||u)for(var f=t._$AA;f!==d;){var v=f.nextSibling;r.insertBefore(f,o),f=v}}return t},v=function(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;return n._$AI(e,t),n},y={},b=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:y;return n._$AH=e},g=function(n){var e;null===(e=n._$AP)||void 0===e||e.call(n,!1,!0);for(var t=n._$AA,i=n._$AB.nextSibling;t!==i;){var r=t.nextSibling;t.remove(),t=r}},m=function(n,e,t){for(var i=new Map,r=e;r<=t;r++)i.set(n[r],r);return i},k=(0,u.XM)(function(n){(0,c.Z)(t,n);var e=(0,d.Z)(t);function t(n){var i;if((0,o.Z)(this,t),i=e.call(this,n),n.type!==u.pX.CHILD)throw Error("repeat() can only be used in text expressions");return(0,l.Z)(i)}return(0,a.Z)(t,[{key:"ct",value:function(n,e,t){var i;void 0===t?t=e:void 0!==e&&(i=e);var o,a=[],l=[],c=0,d=(0,r.Z)(n);try{for(d.s();!(o=d.n()).done;){var s=o.value;a[c]=i?i(s,c):c,l[c]=t(s,c),c++}}catch(u){d.e(u)}finally{d.f()}return{values:l,keys:a}}},{key:"render",value:function(n,e,t){return this.ct(n,e,t).values}},{key:"update",value:function(n,e){var t,r=(0,i.Z)(e,3),o=r[0],a=r[1],l=r[2],c=n._$AH,d=this.ct(o,a,l),u=d.values,h=d.keys;if(!Array.isArray(c))return this.ut=h,u;for(var p,y,k=null!==(t=this.ut)&&void 0!==t?t:this.ut=[],x=[],H=0,Z=c.length-1,L=0,A=u.length-1;H<=Z&&L<=A;)if(null===c[H])H++;else if(null===c[Z])Z--;else if(k[H]===h[L])x[L]=v(c[H],u[L]),H++,L++;else if(k[Z]===h[A])x[A]=v(c[Z],u[A]),Z--,A--;else if(k[H]===h[A])x[A]=v(c[H],u[A]),f(n,x[A+1],c[H]),H++,A--;else if(k[Z]===h[L])x[L]=v(c[Z],u[L]),f(n,c[H],c[Z]),Z--,L++;else if(void 0===p&&(p=m(h,L,A),y=m(k,H,Z)),p.has(k[H]))if(p.has(k[Z])){var _=y.get(h[L]),C=void 0!==_?c[_]:null;if(null===C){var w=f(n,c[H]);v(w,u[L]),x[L]=w}else x[L]=v(C,u[L]),f(n,c[H],C),c[_]=null;L++}else g(c[Z]),Z--;else g(c[H]),H++;for(;L<=A;){var I=f(n,x[A+1]);v(I,u[L]),x[L++]=I}for(;H<=Z;){var O=c[H++];null!==O&&g(O)}return this.ut=h,b(n,x),s.Jb}}]),t}(u.Xe))}}]);
//# sourceMappingURL=835.71e49169.chunk.js.map