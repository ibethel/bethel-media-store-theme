/*! For license information please see bundle.video-html.js.LICENSE.txt */
(()=>{var t={9669:(t,e,r)=>{r(1518)},5448:(t,e,r)=>{"use strict";var n=r(4867),o=r(6026),i=r(4372),s=r(5327),a=r(4097),u=r(4109),c=r(7985),f=r(5061),l=r(7874),p=r(5263);t.exports=function(t){return new Promise((function(e,r){var h,d=t.data,m=t.headers,v=t.responseType;function y(){t.cancelToken&&t.cancelToken.unsubscribe(h),t.signal&&t.signal.removeEventListener("abort",h)}n.isFormData(d)&&delete m["Content-Type"];var g=new XMLHttpRequest;if(t.auth){var b=t.auth.username||"",x=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";m.Authorization="Basic "+btoa(b+":"+x)}var w=a(t.baseURL,t.url);function E(){if(g){var n="getAllResponseHeaders"in g?u(g.getAllResponseHeaders()):null,i={data:v&&"text"!==v&&"json"!==v?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:n,config:t,request:g};o((function(t){e(t),y()}),(function(t){r(t),y()}),i),g=null}}if(g.open(t.method.toUpperCase(),s(w,t.params,t.paramsSerializer),!0),g.timeout=t.timeout,"onloadend"in g?g.onloadend=E:g.onreadystatechange=function(){g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))&&setTimeout(E)},g.onabort=function(){g&&(r(f("Request aborted",t,"ECONNABORTED",g)),g=null)},g.onerror=function(){r(f("Network Error",t,null,g)),g=null},g.ontimeout=function(){var e=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded",n=t.transitional||l;t.timeoutErrorMessage&&(e=t.timeoutErrorMessage),r(f(e,t,n.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",g)),g=null},n.isStandardBrowserEnv()){var O=(t.withCredentials||c(w))&&t.xsrfCookieName?i.read(t.xsrfCookieName):void 0;O&&(m[t.xsrfHeaderName]=O)}"setRequestHeader"in g&&n.forEach(m,(function(t,e){void 0===d&&"content-type"===e.toLowerCase()?delete m[e]:g.setRequestHeader(e,t)})),n.isUndefined(t.withCredentials)||(g.withCredentials=!!t.withCredentials),v&&"json"!==v&&(g.responseType=t.responseType),"function"==typeof t.onDownloadProgress&&g.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&g.upload&&g.upload.addEventListener("progress",t.onUploadProgress),(t.cancelToken||t.signal)&&(h=function(t){g&&(r(!t||t&&t.type?new p("canceled"):t),g.abort(),g=null)},t.cancelToken&&t.cancelToken.subscribe(h),t.signal&&(t.signal.aborted?h():t.signal.addEventListener("abort",h))),d||(d=null),g.send(d)}))}},1518:(t,e,r)=>{"use strict";var n=r(4867),o=r(1849),i=r(321),s=r(7185),a=function t(e){var r=new i(e),a=o(i.prototype.request,r);return n.extend(a,i.prototype,r),n.extend(a,r),a.create=function(r){return t(s(e,r))},a}(r(5546));a.Axios=i,a.Cancel=r(5263),a.CancelToken=r(4972),a.isCancel=r(6502),a.VERSION=r(7288).version,a.all=function(t){return Promise.all(t)},a.spread=r(8713),a.isAxiosError=r(6268),t.exports=a,t.exports.default=a},5263:t=>{"use strict";function e(t){this.message=t}e.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},e.prototype.__CANCEL__=!0,t.exports=e},4972:(t,e,r)=>{"use strict";var n=r(5263);function o(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise((function(t){e=t}));var r=this;this.promise.then((function(t){if(r._listeners){var e,n=r._listeners.length;for(e=0;e<n;e++)r._listeners[e](t);r._listeners=null}})),this.promise.then=function(t){var e,n=new Promise((function(t){r.subscribe(t),e=t})).then(t);return n.cancel=function(){r.unsubscribe(e)},n},t((function(t){r.reason||(r.reason=new n(t),e(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(t){this.reason?t(this.reason):this._listeners?this._listeners.push(t):this._listeners=[t]},o.prototype.unsubscribe=function(t){if(this._listeners){var e=this._listeners.indexOf(t);-1!==e&&this._listeners.splice(e,1)}},o.source=function(){var t;return{token:new o((function(e){t=e})),cancel:t}},t.exports=o},6502:t=>{"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},321:(t,e,r)=>{"use strict";var n=r(4867),o=r(5327),i=r(782),s=r(3572),a=r(7185),u=r(4875),c=u.validators;function f(t){this.defaults=t,this.interceptors={request:new i,response:new i}}f.prototype.request=function(t,e){"string"==typeof t?(e=e||{}).url=t:e=t||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var r=e.transitional;void 0!==r&&u.assertOptions(r,{silentJSONParsing:c.transitional(c.boolean),forcedJSONParsing:c.transitional(c.boolean),clarifyTimeoutError:c.transitional(c.boolean)},!1);var n=[],o=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(o=o&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var i,f=[];if(this.interceptors.response.forEach((function(t){f.push(t.fulfilled,t.rejected)})),!o){var l=[s,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(f),i=Promise.resolve(e);l.length;)i=i.then(l.shift(),l.shift());return i}for(var p=e;n.length;){var h=n.shift(),d=n.shift();try{p=h(p)}catch(t){d(t);break}}try{i=s(p)}catch(t){return Promise.reject(t)}for(;f.length;)i=i.then(f.shift(),f.shift());return i},f.prototype.getUri=function(t){return t=a(this.defaults,t),o(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(t){f.prototype[t]=function(e,r){return this.request(a(r||{},{method:t,url:e,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(t){f.prototype[t]=function(e,r,n){return this.request(a(n||{},{method:t,url:e,data:r}))}})),t.exports=f},782:(t,e,r)=>{"use strict";var n=r(4867);function o(){this.handlers=[]}o.prototype.use=function(t,e,r){return this.handlers.push({fulfilled:t,rejected:e,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){n.forEach(this.handlers,(function(e){null!==e&&t(e)}))},t.exports=o},4097:(t,e,r)=>{"use strict";var n=r(1793),o=r(7303);t.exports=function(t,e){return t&&!n(e)?o(t,e):e}},5061:(t,e,r)=>{"use strict";var n=r(481);t.exports=function(t,e,r,o,i){var s=new Error(t);return n(s,e,r,o,i)}},3572:(t,e,r)=>{"use strict";var n=r(4867),o=r(8527),i=r(6502),s=r(5546),a=r(5263);function u(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new a("canceled")}t.exports=function(t){return u(t),t.headers=t.headers||{},t.data=o.call(t,t.data,t.headers,t.transformRequest),t.headers=n.merge(t.headers.common||{},t.headers[t.method]||{},t.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(e){delete t.headers[e]})),(t.adapter||s.adapter)(t).then((function(e){return u(t),e.data=o.call(t,e.data,e.headers,t.transformResponse),e}),(function(e){return i(e)||(u(t),e&&e.response&&(e.response.data=o.call(t,e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)}))}},481:t=>{"use strict";t.exports=function(t,e,r,n,o){return t.config=e,r&&(t.code=r),t.request=n,t.response=o,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},t}},7185:(t,e,r)=>{"use strict";var n=r(4867);t.exports=function(t,e){e=e||{};var r={};function o(t,e){return n.isPlainObject(t)&&n.isPlainObject(e)?n.merge(t,e):n.isPlainObject(e)?n.merge({},e):n.isArray(e)?e.slice():e}function i(r){return n.isUndefined(e[r])?n.isUndefined(t[r])?void 0:o(void 0,t[r]):o(t[r],e[r])}function s(t){if(!n.isUndefined(e[t]))return o(void 0,e[t])}function a(r){return n.isUndefined(e[r])?n.isUndefined(t[r])?void 0:o(void 0,t[r]):o(void 0,e[r])}function u(r){return r in e?o(t[r],e[r]):r in t?o(void 0,t[r]):void 0}var c={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:u};return n.forEach(Object.keys(t).concat(Object.keys(e)),(function(t){var e=c[t]||i,o=e(t);n.isUndefined(o)&&e!==u||(r[t]=o)})),r}},6026:(t,e,r)=>{"use strict";var n=r(5061);t.exports=function(t,e,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?e(n("Request failed with status code "+r.status,r.config,null,r.request,r)):t(r)}},8527:(t,e,r)=>{"use strict";var n=r(4867),o=r(5546);t.exports=function(t,e,r){var i=this||o;return n.forEach(r,(function(r){t=r.call(i,t,e)})),t}},5546:(t,e,r)=>{"use strict";var n=r(4867),o=r(6016),i=r(481),s=r(7874),a={"Content-Type":"application/x-www-form-urlencoded"};function u(t,e){!n.isUndefined(t)&&n.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var c,f={transitional:s,adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(c=r(5448)),c),transformRequest:[function(t,e){return o(e,"Accept"),o(e,"Content-Type"),n.isFormData(t)||n.isArrayBuffer(t)||n.isBuffer(t)||n.isStream(t)||n.isFile(t)||n.isBlob(t)?t:n.isArrayBufferView(t)?t.buffer:n.isURLSearchParams(t)?(u(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):n.isObject(t)||e&&"application/json"===e["Content-Type"]?(u(e,"application/json"),function(t,e,r){if(n.isString(t))try{return(0,JSON.parse)(t),n.trim(t)}catch(t){if("SyntaxError"!==t.name)throw t}return(0,JSON.stringify)(t)}(t)):t}],transformResponse:[function(t){var e=this.transitional||f.transitional,r=e&&e.silentJSONParsing,o=e&&e.forcedJSONParsing,s=!r&&"json"===this.responseType;if(s||o&&n.isString(t)&&t.length)try{return JSON.parse(t)}catch(t){if(s){if("SyntaxError"===t.name)throw i(t,this,"E_JSON_PARSE");throw t}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(t){f.headers[t]={}})),n.forEach(["post","put","patch"],(function(t){f.headers[t]=n.merge(a)})),t.exports=f},7874:t=>{"use strict";t.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},7288:t=>{t.exports={version:"0.26.1"}},1849:t=>{"use strict";t.exports=function(t,e){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return t.apply(e,r)}}},5327:(t,e,r)=>{"use strict";var n=r(4867);function o(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,r){if(!e)return t;var i;if(r)i=r(e);else if(n.isURLSearchParams(e))i=e.toString();else{var s=[];n.forEach(e,(function(t,e){null!=t&&(n.isArray(t)?e+="[]":t=[t],n.forEach(t,(function(t){n.isDate(t)?t=t.toISOString():n.isObject(t)&&(t=JSON.stringify(t)),s.push(o(e)+"="+o(t))})))})),i=s.join("&")}if(i){var a=t.indexOf("#");-1!==a&&(t=t.slice(0,a)),t+=(-1===t.indexOf("?")?"?":"&")+i}return t}},7303:t=>{"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},4372:(t,e,r)=>{"use strict";var n=r(4867);t.exports=n.isStandardBrowserEnv()?{write:function(t,e,r,o,i,s){var a=[];a.push(t+"="+encodeURIComponent(e)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},1793:t=>{"use strict";t.exports=function(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}},6268:(t,e,r)=>{"use strict";var n=r(4867);t.exports=function(t){return n.isObject(t)&&!0===t.isAxiosError}},7985:(t,e,r)=>{"use strict";var n=r(4867);t.exports=n.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(t){var n=t;return e&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return t=o(window.location.href),function(e){var r=n.isString(e)?o(e):e;return r.protocol===t.protocol&&r.host===t.host}}():function(){return!0}},6016:(t,e,r)=>{"use strict";var n=r(4867);t.exports=function(t,e){n.forEach(t,(function(r,n){n!==e&&n.toUpperCase()===e.toUpperCase()&&(t[e]=r,delete t[n])}))}},4109:(t,e,r)=>{"use strict";var n=r(4867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,r,i,s={};return t?(n.forEach(t.split("\n"),(function(t){if(i=t.indexOf(":"),e=n.trim(t.substr(0,i)).toLowerCase(),r=n.trim(t.substr(i+1)),e){if(s[e]&&o.indexOf(e)>=0)return;s[e]="set-cookie"===e?(s[e]?s[e]:[]).concat([r]):s[e]?s[e]+", "+r:r}})),s):s}},8713:t=>{"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},4875:(t,e,r)=>{"use strict";var n=r(7288).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(t,e){o[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}}));var i={};o.transitional=function(t,e,r){function o(t,e){return"[Axios v"+n+"] Transitional option '"+t+"'"+e+(r?". "+r:"")}return function(r,n,s){if(!1===t)throw new Error(o(n," has been removed"+(e?" in "+e:"")));return e&&!i[n]&&(i[n]=!0,console.warn(o(n," has been deprecated since v"+e+" and will be removed in the near future"))),!t||t(r,n,s)}},t.exports={assertOptions:function(t,e,r){if("object"!=typeof t)throw new TypeError("options must be an object");for(var n=Object.keys(t),o=n.length;o-- >0;){var i=n[o],s=e[i];if(s){var a=t[i],u=void 0===a||s(a,i,t);if(!0!==u)throw new TypeError("option "+i+" must be "+u)}else if(!0!==r)throw Error("Unknown option "+i)}},validators:o}},4867:(t,e,r)=>{"use strict";var n=r(1849),o=Object.prototype.toString;function i(t){return Array.isArray(t)}function s(t){return void 0===t}function a(t){return"[object ArrayBuffer]"===o.call(t)}function u(t){return null!==t&&"object"==typeof t}function c(t){if("[object Object]"!==o.call(t))return!1;var e=Object.getPrototypeOf(t);return null===e||e===Object.prototype}function f(t){return"[object Function]"===o.call(t)}function l(t,e){if(null!=t)if("object"!=typeof t&&(t=[t]),i(t))for(var r=0,n=t.length;r<n;r++)e.call(null,t[r],r,t);else for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(null,t[o],o,t)}t.exports={isArray:i,isArrayBuffer:a,isBuffer:function(t){return null!==t&&!s(t)&&null!==t.constructor&&!s(t.constructor)&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)},isFormData:function(t){return"[object FormData]"===o.call(t)},isArrayBufferView:function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&a(t.buffer)},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:u,isPlainObject:c,isUndefined:s,isDate:function(t){return"[object Date]"===o.call(t)},isFile:function(t){return"[object File]"===o.call(t)},isBlob:function(t){return"[object Blob]"===o.call(t)},isFunction:f,isStream:function(t){return u(t)&&f(t.pipe)},isURLSearchParams:function(t){return"[object URLSearchParams]"===o.call(t)},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function t(){var e={};function r(r,n){c(e[n])&&c(r)?e[n]=t(e[n],r):c(r)?e[n]=t({},r):i(r)?e[n]=r.slice():e[n]=r}for(var n=0,o=arguments.length;n<o;n++)l(arguments[n],r);return e},extend:function(t,e,r){return l(e,(function(e,o){t[o]=r&&"function"==typeof e?n(e,r):e})),t},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},stripBOM:function(t){return 65279===t.charCodeAt(0)&&(t=t.slice(1)),t}}},7706:(t,e,r)=>{"use strict";r(1882)},1882:(t,e,r)=>{"use strict";r(4687),r(7010)},7010:(t,e,r)=>{"use strict";r(4687),r(9669),r(1882)},7061:(t,e,r)=>{var n=r(8698).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},r=Object.prototype,i=r.hasOwnProperty,s=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",f=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new T(n||[]);return s(i,"_invoke",{value:S(t,r,a)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var d={};function m(){}function v(){}function y(){}var g={};l(g,u,(function(){return this}));var b=Object.getPrototypeOf,x=b&&b(b(_([])));x&&x!==r&&i.call(x,u)&&(g=x);var w=y.prototype=m.prototype=Object.create(g);function E(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function O(t,e){function r(o,s,a,u){var c=h(t[o],t,s);if("throw"!==c.type){var f=c.arg,l=f.value;return l&&"object"==n(l)&&i.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(l).then((function(t){f.value=t,a(f)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var o;s(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var s=r.delegate;if(s){var a=j(s,r);if(a){if(a===d)continue;return a}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=h(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function j(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function _(t){if(t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:A}}function A(){return{value:void 0,done:!0}}return v.prototype=y,s(w,"constructor",{value:y,configurable:!0}),s(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,f,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,f,"GeneratorFunction")),t.prototype=Object.create(w),t},e.awrap=function(t){return{__await:t}},E(O.prototype),l(O.prototype,c,(function(){return this})),e.AsyncIterator=O,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var s=new O(p(t,r,n,o),i);return e.isGeneratorFunction(r)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},E(w),l(w,f,"Generator"),l(w,u,(function(){return this})),l(w,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=_,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(N),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return s.type="throw",s.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],s=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var a=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(a&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=t,s.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),N(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},8698:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},4687:(t,e,r)=>{var n=r(7061)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";r(7706)})()})();