/*! For license information please see bundle.SettingsContext.js.LICENSE.txt */
(()=>{"use strict";var e={8572:(e,t,r)=>{r.d(t,{F:()=>o});var o=function(){var e=document.querySelector("#bmApi").textContent;return e?JSON.parse(e):{}}},7418:e=>{var t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}()?Object.assign:function(e,n){for(var a,c,i=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),p=1;p<arguments.length;p++){for(var u in a=Object(arguments[p]))r.call(a,u)&&(i[u]=a[u]);if(t){c=t(a);for(var s=0;s<c.length;s++)o.call(a,c[s])&&(i[c[s]]=a[c[s]])}}return i}},2408:(e,t,r)=>{var o=r(7418);if("function"==typeof Symbol&&Symbol.for){var n=Symbol.for;n("react.element"),n("react.portal"),n("react.fragment"),n("react.strict_mode"),n("react.profiler"),n("react.provider"),n("react.context"),n("react.forward_ref"),n("react.suspense"),n("react.memo"),n("react.lazy")}"function"==typeof Symbol&&Symbol.iterator;function a(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},i={};function p(e,t,r){this.props=e,this.context=t,this.refs=i,this.updater=r||c}function u(){}function s(e,t,r){this.props=e,this.context=t,this.refs=i,this.updater=r||c}p.prototype.isReactComponent={},p.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(a(85));this.updater.enqueueSetState(this,e,t,"setState")},p.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},u.prototype=p.prototype;var f=s.prototype=new u;f.constructor=s,o(f,p.prototype),f.isPureReactComponent=!0;Object.prototype.hasOwnProperty},7294:(e,t,r)=>{r(2408)}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,r),a.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{r(7294);var e=(0,r(8572).F)();e.cartPage.cart,e.cartPage.copy.checkout_button,e.cartPage.copy.continue_browsing,e.cartPage.copy.cart_empty,e.cartPage.copy.regular_price,e.cartPage.copy.sale_price,e.cartPage.copy.qty,e.bulkOrders.bulkOrderApproved.message,e.bulkOrders.bulkOrderNotApproved.message,e.cartPage.copy.remove,e.cartPage.copy.subtotal_title,e.cartPage.copy.summary_title})()})();