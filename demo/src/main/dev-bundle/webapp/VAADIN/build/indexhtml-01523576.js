(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.sideNavComponent=!0;const Vn="modulepreload",Dn=function(o,e){return new URL(o,e).href},nr={},E=function(e,t,r){if(!t||t.length===0)return e();const n=document.getElementsByTagName("link");return Promise.all(t.map(i=>{if(i=Dn(i,r),i in nr)return;nr[i]=!0;const s=i.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(!!r)for(let c=n.length-1;c>=0;c--){const m=n[c];if(m.href===i&&(!s||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${l}`))return;const d=document.createElement("link");if(d.rel=s?"stylesheet":Vn,s||(d.as="script",d.crossOrigin=""),d.href=i,document.head.appendChild(d),s)return new Promise((c,m)=>{d.addEventListener("load",c),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e())};function wt(o){return o=o||[],Array.isArray(o)?o:[o]}function Y(o){return`[Vaadin.Router] ${o}`}function Un(o){if(typeof o!="object")return String(o);const e=Object.prototype.toString.call(o).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(o)}`:e}const _t="module",St="nomodule",ko=[_t,St];function ir(o){if(!o.match(/.+\.[m]?js$/))throw new Error(Y(`Unsupported type for bundle "${o}": .js or .mjs expected.`))}function Zr(o){if(!o||!K(o.path))throw new Error(Y('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=o.bundle,t=["component","redirect","bundle"];if(!be(o.action)&&!Array.isArray(o.children)&&!be(o.children)&&!Et(e)&&!t.some(r=>K(o[r])))throw new Error(Y(`Expected route config "${o.path}" to include either "${t.join('", "')}" or "action" function but none found.`));if(e)if(K(e))ir(e);else if(ko.some(r=>r in e))ko.forEach(r=>r in e&&ir(e[r]));else throw new Error(Y('Expected route bundle to include either "'+St+'" or "'+_t+'" keys, or both'));o.redirect&&["bundle","component"].forEach(r=>{r in o&&console.warn(Y(`Route config "${o.path}" has both "redirect" and "${r}" properties, and "redirect" will always override the latter. Did you mean to only use "${r}"?`))})}function sr(o){wt(o).forEach(e=>Zr(e))}function ar(o,e){let t=document.head.querySelector('script[src="'+o+'"][async]');return t||(t=document.createElement("script"),t.setAttribute("src",o),e===_t?t.setAttribute("type",_t):e===St&&t.setAttribute(St,""),t.async=!0),new Promise((r,n)=>{t.onreadystatechange=t.onload=i=>{t.__dynamicImportLoaded=!0,r(i)},t.onerror=i=>{t.parentNode&&t.parentNode.removeChild(t),n(i)},t.parentNode===null?document.head.appendChild(t):t.__dynamicImportLoaded&&r()})}function jn(o){return K(o)?ar(o):Promise.race(ko.filter(e=>e in o).map(e=>ar(o[e],e)))}function He(o,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${o}`,{cancelable:o==="go",detail:e}))}function Et(o){return typeof o=="object"&&!!o}function be(o){return typeof o=="function"}function K(o){return typeof o=="string"}function en(o){const e=new Error(Y(`Page not found (${o.pathname})`));return e.context=o,e.code=404,e}const Ie=new class{};function Fn(o){const e=o.port,t=o.protocol,i=t==="http:"&&e==="80"||t==="https:"&&e==="443"?o.hostname:o.host;return`${t}//${i}`}function lr(o){if(o.defaultPrevented||o.button!==0||o.shiftKey||o.ctrlKey||o.altKey||o.metaKey)return;let e=o.target;const t=o.composedPath?o.composedPath():o.path||[];for(let l=0;l<t.length;l++){const a=t[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Fn(e))!==window.location.origin)return;const{pathname:n,search:i,hash:s}=e;He("go",{pathname:n,search:i,hash:s})&&(o.preventDefault(),o&&o.type==="click"&&window.scrollTo(0,0))}const Bn={activate(){window.document.addEventListener("click",lr)},inactivate(){window.document.removeEventListener("click",lr)}},Hn=/Trident/.test(navigator.userAgent);Hn&&!be(window.PopStateEvent)&&(window.PopStateEvent=function(o,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(o,!!e.bubbles,!!e.cancelable),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function dr(o){if(o.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:r}=window.location;He("go",{pathname:e,search:t,hash:r})}const Wn={activate(){window.addEventListener("popstate",dr)},inactivate(){window.removeEventListener("popstate",dr)}};var Ue=an,qn=zo,Gn=Xn,Kn=rn,Yn=sn,tn="/",on="./",Jn=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function zo(o,e){for(var t=[],r=0,n=0,i="",s=e&&e.delimiter||tn,l=e&&e.delimiters||on,a=!1,d;(d=Jn.exec(o))!==null;){var c=d[0],m=d[1],h=d.index;if(i+=o.slice(n,h),n=h+c.length,m){i+=m[1],a=!0;continue}var g="",se=o[n],ae=d[2],oe=d[3],Wt=d[4],B=d[5];if(!a&&i.length){var X=i.length-1;l.indexOf(i[X])>-1&&(g=i[X],i=i.slice(0,X))}i&&(t.push(i),i="",a=!1);var Ee=g!==""&&se!==void 0&&se!==g,Ce=B==="+"||B==="*",qt=B==="?"||B==="*",re=g||s,it=oe||Wt;t.push({name:ae||r++,prefix:g,delimiter:re,optional:qt,repeat:Ce,partial:Ee,pattern:it?Qn(it):"[^"+le(re)+"]+?"})}return(i||n<o.length)&&t.push(i+o.substr(n)),t}function Xn(o,e){return rn(zo(o,e))}function rn(o){for(var e=new Array(o.length),t=0;t<o.length;t++)typeof o[t]=="object"&&(e[t]=new RegExp("^(?:"+o[t].pattern+")$"));return function(r,n){for(var i="",s=n&&n.encode||encodeURIComponent,l=0;l<o.length;l++){var a=o[l];if(typeof a=="string"){i+=a;continue}var d=r?r[a.name]:void 0,c;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var m=0;m<d.length;m++){if(c=s(d[m],a),!e[l].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');i+=(m===0?a.prefix:a.delimiter)+c}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(c=s(String(d),a),!e[l].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');i+=a.prefix+c;continue}if(a.optional){a.partial&&(i+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return i}}function le(o){return o.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Qn(o){return o.replace(/([=!:$/()])/g,"\\$1")}function nn(o){return o&&o.sensitive?"":"i"}function Zn(o,e){if(!e)return o;var t=o.source.match(/\((?!\?)/g);if(t)for(var r=0;r<t.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return o}function ei(o,e,t){for(var r=[],n=0;n<o.length;n++)r.push(an(o[n],e,t).source);return new RegExp("(?:"+r.join("|")+")",nn(t))}function ti(o,e,t){return sn(zo(o,t),e,t)}function sn(o,e,t){t=t||{};for(var r=t.strict,n=t.start!==!1,i=t.end!==!1,s=le(t.delimiter||tn),l=t.delimiters||on,a=[].concat(t.endsWith||[]).map(le).concat("$").join("|"),d=n?"^":"",c=o.length===0,m=0;m<o.length;m++){var h=o[m];if(typeof h=="string")d+=le(h),c=m===o.length-1&&l.indexOf(h[h.length-1])>-1;else{var g=h.repeat?"(?:"+h.pattern+")(?:"+le(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?d+=le(h.prefix)+"("+g+")?":d+="(?:"+le(h.prefix)+"("+g+"))?":d+=le(h.prefix)+"("+g+")"}}return i?(r||(d+="(?:"+s+")?"),d+=a==="$"?"$":"(?="+a+")"):(r||(d+="(?:"+s+"(?="+a+"))?"),c||(d+="(?="+s+"|"+a+")")),new RegExp(d,nn(t))}function an(o,e,t){return o instanceof RegExp?Zn(o,e):Array.isArray(o)?ei(o,e,t):ti(o,e,t)}Ue.parse=qn;Ue.compile=Gn;Ue.tokensToFunction=Kn;Ue.tokensToRegExp=Yn;const{hasOwnProperty:oi}=Object.prototype,$o=new Map;$o.set("|false",{keys:[],pattern:/(?:)/});function cr(o){try{return decodeURIComponent(o)}catch{return o}}function ri(o,e,t,r,n){t=!!t;const i=`${o}|${t}`;let s=$o.get(i);if(!s){const d=[];s={keys:d,pattern:Ue(o,d,{end:t,strict:o===""})},$o.set(i,s)}const l=s.pattern.exec(e);if(!l)return null;const a=Object.assign({},n);for(let d=1;d<l.length;d++){const c=s.keys[d-1],m=c.name,h=l[d];(h!==void 0||!oi.call(a,m))&&(c.repeat?a[m]=h?h.split(c.delimiter).map(cr):[]:a[m]=h&&cr(h))}return{path:l[0],keys:(r||[]).concat(s.keys),params:a}}function ln(o,e,t,r,n){let i,s,l=0,a=o.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(d){if(o===d)return{done:!0};const c=o.__children=o.__children||o.children;if(!i&&(i=ri(a,e,!c,r,n),i))return{done:!1,value:{route:o,keys:i.keys,params:i.params,path:i.path}};if(i&&c)for(;l<c.length;){if(!s){const h=c[l];h.parent=o;let g=i.path.length;g>0&&e.charAt(g)==="/"&&(g+=1),s=ln(h,e.substr(g),t,i.keys,i.params)}const m=s.next(d);if(!m.done)return{done:!1,value:m.value};s=null,l++}return{done:!0}}}}function ni(o){if(be(o.route.action))return o.route.action(o)}function ii(o,e){let t=e;for(;t;)if(t=t.parent,t===o)return!0;return!1}function si(o){let e=`Path '${o.pathname}' is not properly resolved due to an error.`;const t=(o.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function ai(o,e){const{route:t,path:r}=e;if(t&&!t.__synthetic){const n={path:r,route:t};if(!o.chain)o.chain=[];else if(t.parent){let i=o.chain.length;for(;i--&&o.chain[i].route&&o.chain[i].route!==t.parent;)o.chain.pop()}o.chain.push(n)}}class qe{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||ni,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){sr(e);const t=[...wt(e)];this.root.__children=t}addRoutes(e){return sr(e),this.root.__children.push(...wt(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,K(e)?{pathname:e}:e),r=ln(this.root,this.__normalizePathname(t.pathname),this.baseUrl),n=this.resolveRoute;let i=null,s=null,l=t;function a(d,c=i.value.route,m){const h=m===null&&i.value.route;return i=s||r.next(h),s=null,!d&&(i.done||!ii(c,i.value.route))?(s=i,Promise.resolve(Ie)):i.done?Promise.reject(en(t)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},t,i.value),ai(l,i.value),Promise.resolve(n(l)).then(g=>g!=null&&g!==Ie?(l.result=g.result||g,l):a(d,c,g)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const c=si(l);if(d?console.warn(c):d=new Error(c),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,t){return new URL(e,t)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,r=this.constructor.__createUrl(e,t).href;if(r.slice(0,t.length)===t)return r.slice(t.length)}}qe.pathToRegexp=Ue;const{pathToRegexp:hr}=qe,ur=new Map;function dn(o,e,t){const r=e.name||e.component;if(r&&(o.has(r)?o.get(r).push(e):o.set(r,[e])),Array.isArray(t))for(let n=0;n<t.length;n++){const i=t[n];i.parent=e,dn(o,i,i.__children||i.children)}}function pr(o,e){const t=o.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function mr(o){let e=o.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function li(o,e={}){if(!(o instanceof qe))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(r,n)=>{let i=pr(t,r);if(!i&&(t.clear(),dn(t,o.root,o.root.__children),i=pr(t,r),!i))throw new Error(`Route "${r}" not found`);let s=ur.get(i.fullPath);if(!s){let a=mr(i),d=i.parent;for(;d;){const g=mr(d);g&&(a=g.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const c=hr.parse(a),m=hr.tokensToFunction(c),h=Object.create(null);for(let g=0;g<c.length;g++)K(c[g])||(h[c[g].name]=!0);s={toPath:m,keys:h},ur.set(a,s),i.fullPath=a}let l=s.toPath(n,e)||"/";if(e.stringifyQueryParams&&n){const a={},d=Object.keys(n);for(let m=0;m<d.length;m++){const h=d[m];s.keys[h]||(a[h]=n[h])}const c=e.stringifyQueryParams(a);c&&(l+=c.charAt(0)==="?"?c:`?${c}`)}return l}}let gr=[];function di(o){gr.forEach(e=>e.inactivate()),o.forEach(e=>e.activate()),gr=o}const ci=o=>{const e=getComputedStyle(o).getPropertyValue("animation-name");return e&&e!=="none"},hi=(o,e)=>{const t=()=>{o.removeEventListener("animationend",t),e()};o.addEventListener("animationend",t)};function fr(o,e){return o.classList.add(e),new Promise(t=>{if(ci(o)){const r=o.getBoundingClientRect(),n=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;o.setAttribute("style",`position: absolute; ${n}`),hi(o,()=>{o.classList.remove(e),o.removeAttribute("style"),t()})}else o.classList.remove(e),t()})}const ui=256;function Jt(o){return o!=null}function pi(o){const e=Object.assign({},o);return delete e.next,e}function q({pathname:o="",search:e="",hash:t="",chain:r=[],params:n={},redirectFrom:i,resolver:s},l){const a=r.map(d=>d.route);return{baseUrl:s&&s.baseUrl||"",pathname:o,search:e,hash:t,routes:a,route:l||a.length&&a[a.length-1]||null,params:n,redirectFrom:i,getUrl:(d={})=>ft(de.pathToRegexp.compile(cn(a))(Object.assign({},n,d)),s)}}function vr(o,e){const t=Object.assign({},o.params);return{redirect:{pathname:e,from:o.pathname,params:t}}}function mi(o,e){e.location=q(o);const t=o.chain.map(r=>r.route).indexOf(o.route);return o.chain[t].element=e,e}function gt(o,e,t){if(be(o))return o.apply(t,e)}function yr(o,e,t){return r=>{if(r&&(r.cancel||r.redirect))return r;if(t)return gt(t[o],e,t)}}function gi(o,e){if(!Array.isArray(o)&&!Et(o))throw new Error(Y(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${o}`));e.__children=[];const t=wt(o);for(let r=0;r<t.length;r++)Zr(t[r]),e.__children.push(t[r])}function ct(o){if(o&&o.length){const e=o[0].parentNode;for(let t=0;t<o.length;t++)e.removeChild(o[t])}}function ft(o,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(o.replace(/^\//,""),t).pathname:o}function cn(o){return o.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class de extends qe{constructor(e,t){const r=document.head.querySelector("base"),n=r&&r.getAttribute("href");super([],Object.assign({baseUrl:n&&qe.__createUrl(n,document.URL).pathname.replace(/[^\/]*$/,"")},t)),this.resolveRoute=s=>this.__resolveRoute(s);const i=de.NavigationTrigger;de.setTriggers.apply(de,Object.keys(i).map(s=>i[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=q({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let r=Promise.resolve();be(t.children)&&(r=r.then(()=>t.children(pi(e))).then(i=>{!Jt(i)&&!be(t.children)&&(i=t.children),gi(i,t)}));const n={redirect:i=>vr(e,i),component:i=>{const s=document.createElement(i);return this.__createdByRouter.set(s,!0),s}};return r.then(()=>{if(this.__isLatestRender(e))return gt(t.action,[e,n],t)}).then(i=>{if(Jt(i)&&(i instanceof HTMLElement||i.redirect||i===Ie))return i;if(K(t.redirect))return n.redirect(t.redirect);if(t.bundle)return jn(t.bundle).then(()=>{},()=>{throw new Error(Y(`Bundle not found: ${t.bundle}. Check if the file name is correct`))})}).then(i=>{if(Jt(i))return i;if(K(t.component))return n.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const r=++this.__lastStartedRenderId,n=Object.assign({search:"",hash:""},K(e)?{pathname:e}:e,{__renderId:r});return this.ready=this.resolve(n).then(i=>this.__fullyResolveChain(i)).then(i=>{if(this.__isLatestRender(i)){const s=this.__previousContext;if(i===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=q(i),t&&this.__updateBrowserHistory(i,r===1),He("location-changed",{router:this,location:this.location}),i.__skipAttach)return this.__copyUnchangedElements(i,s),this.__previousContext=i,this.location;this.__addAppearingContent(i,s);const l=this.__animateIfNeeded(i);return this.__runOnAfterEnterCallbacks(i),this.__runOnAfterLeaveCallbacks(i,s),l.then(()=>{if(this.__isLatestRender(i))return this.__removeDisappearingContent(),this.__previousContext=i,this.location})}}).catch(i=>{if(r===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(n),ct(this.__outlet&&this.__outlet.children),this.location=q(Object.assign(n,{resolver:this})),He("error",Object.assign({router:this,error:i},n)),i}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(r=>{const i=r!==t?r:e,l=ft(cn(r.chain),r.resolver)===r.pathname,a=(d,c=d.route,m)=>d.next(void 0,c,m).then(h=>h===null||h===Ie?l?d:c.parent!==null?a(d,c.parent,h):h:h);return a(r).then(d=>{if(d===null||d===Ie)throw en(i);return d&&d!==Ie&&d!==r?this.__fullyResolveChain(i,d):this.__amendWithOnBeforeCallbacks(r)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(mi(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(r=>this.__findComponentContextAfterAllRedirects(r)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(Y(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Un(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},r=t.chain||[],n=e.chain;let i=Promise.resolve();const s=()=>({cancel:!0}),l=a=>vr(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,r.length){for(let a=0;a<Math.min(r.length,n.length)&&!(r[a].route!==n[a].route||r[a].path!==n[a].path&&r[a].element!==n[a].element||!this.__isReusableElement(r[a].element,n[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=n.length===r.length&&e.__divergedChainIndex==n.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=n.length-1;a>=0;a--)i=this.__runOnBeforeLeaveCallbacks(i,e,{prevent:s},r[a]);for(let a=0;a<n.length;a++)i=this.__runOnBeforeEnterCallbacks(i,e,{prevent:s,redirect:l},n[a]),r[a].element.location=q(e,r[a].route)}else for(let a=r.length-1;a>=e.__divergedChainIndex;a--)i=this.__runOnBeforeLeaveCallbacks(i,e,{prevent:s},r[a])}if(!e.__skipAttach)for(let a=0;a<n.length;a++)a<e.__divergedChainIndex?a<r.length&&r[a].element&&(r[a].element.location=q(e,r[a].route)):(i=this.__runOnBeforeEnterCallbacks(i,e,{prevent:s,redirect:l},n[a]),n[a].element&&(n[a].element.location=q(e,n[a].route)));return i.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,r,n){const i=q(t);return e.then(s=>{if(this.__isLatestRender(t))return yr("onBeforeLeave",[i,r,this],n.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,t,r,n){const i=q(t,n.route);return e.then(s=>{if(this.__isLatestRender(t))return yr("onBeforeEnter",[i,r,this],n.element)(s)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,r){if(t>ui)throw new Error(Y(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:r})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(Y(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:r=""},n){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==r){const i=n?"replaceState":"pushState";window.history[i](null,document.title,e+t+r),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let r=this.__outlet;for(let n=0;n<e.__divergedChainIndex;n++){const i=t&&t.chain[n].element;if(i)if(i.parentNode===r)e.chain[n].element=i,r=i;else break}return r}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const r=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(r.children).filter(i=>this.__addedByRouter.get(i)&&i!==e.result);let n=r;for(let i=e.__divergedChainIndex;i<e.chain.length;i++){const s=e.chain[i].element;s&&(n.appendChild(s),this.__addedByRouter.set(s,!0),n===r&&this.__appearingContent.push(s),n=s)}}__removeDisappearingContent(){this.__disappearingContent&&ct(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(ct(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let r=t.chain.length-1;r>=e.__divergedChainIndex&&this.__isLatestRender(e);r--){const n=t.chain[r].element;if(n)try{const i=q(e);gt(n.onAfterLeave,[i,{},t.resolver],n)}finally{this.__disappearingContent.indexOf(n)>-1&&ct(n.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const r=e.chain[t].element||{},n=q(e,e.chain[t].route);gt(r.onAfterEnter,[n,{},e.resolver],r)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],r=(this.__appearingContent||[])[0],n=[],i=e.chain;let s;for(let l=i.length;l>0;l--)if(i[l-1].route.animate){s=i[l-1].route.animate;break}if(t&&r&&s){const l=Et(s)&&s.leave||"leaving",a=Et(s)&&s.enter||"entering";n.push(fr(t,l)),n.push(fr(r,a))}return Promise.all(n).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:r,hash:n}=e?e.detail:window.location;K(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:r,hash:n},!0))}static setTriggers(...e){di(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=li(this)),ft(this.__urlForName(e,t),this)}urlForPath(e,t){return ft(de.pathToRegexp.compile(e)(t),this)}static go(e){const{pathname:t,search:r,hash:n}=K(e)?this.__createUrl(e,"http://a"):e;return He("go",{pathname:t,search:r,hash:n})}}const fi=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,vt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function vi(){function o(){return!0}return hn(o)}function yi(){try{return bi()?!0:xi()?vt?!wi():!vi():!1}catch{return!1}}function bi(){return localStorage.getItem("vaadin.developmentmode.force")}function xi(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function wi(){return!!(vt&&Object.keys(vt).map(e=>vt[e]).filter(e=>e.productionMode).length>0)}function hn(o,e){if(typeof o!="function")return;const t=fi.exec(o.toString());if(t)try{o=new Function(t[1])}catch(r){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",r)}return o(e)}window.Vaadin=window.Vaadin||{};const br=function(o,e){if(window.Vaadin.developmentMode)return hn(o,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=yi());function _i(){}const Si=function(){if(typeof br=="function")return br(_i)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});Si();de.NavigationTrigger={POPSTATE:Wn,CLICK:Bn};var Xt,$;(function(o){o.CONNECTED="connected",o.LOADING="loading",o.RECONNECTING="reconnecting",o.CONNECTION_LOST="connection-lost"})($||($={}));class Ei{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(t=>{var r;(r=t==null?void 0:t.active)===null||r===void 0||r.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=$.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount($.CONNECTED)}loadingFailed(){this.decreaseLoadingCount($.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const t=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const r of this.stateChangeListeners)r(t,this.connectionState)}}get online(){return this.connectionState===$.CONNECTED||this.connectionState===$.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=$.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const Ci=o=>!!(o==="localhost"||o==="[::1]"||o.match(/^127\.\d+\.\d+\.\d+$/)),ht=window;if(!(!((Xt=ht.Vaadin)===null||Xt===void 0)&&Xt.connectionState)){let o;Ci(window.location.hostname)?o=!0:o=navigator.onLine,ht.Vaadin=ht.Vaadin||{},ht.Vaadin.connectionState=new Ei(o?$.CONNECTED:$.CONNECTION_LOST)}function j(o,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(o,e,t,r);else for(var l=o.length-1;l>=0;l--)(s=o[l])&&(i=(n<3?s(i):n>3?s(e,t,i):s(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ki=!1,yt=window,Lo=yt.ShadowRoot&&(yt.ShadyCSS===void 0||yt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mo=Symbol(),xr=new WeakMap;class Vo{constructor(e,t,r){if(this._$cssResult$=!0,r!==Mo)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=t}get styleSheet(){let e=this._styleSheet;const t=this._strings;if(Lo&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=xr.get(t)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),r&&xr.set(t,e))}return e}toString(){return this.cssText}}const $i=o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${o}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},un=o=>new Vo(typeof o=="string"?o:String(o),void 0,Mo),x=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((r,n,i)=>r+$i(n)+o[i+1],o[0]);return new Vo(t,o,Mo)},Ti=(o,e)=>{Lo?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const r=document.createElement("style"),n=yt.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=t.cssText,o.appendChild(r)})},Ni=o=>{let e="";for(const t of o.cssRules)e+=t.cssText;return un(e)},wr=Lo||ki?o=>o:o=>o instanceof CSSStyleSheet?Ni(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qt,Zt,eo,pn;const ee=window;let mn,ce;const _r=ee.trustedTypes,Pi=_r?_r.emptyScript:"",bt=ee.reactiveElementPolyfillSupportDevMode;{const o=(Qt=ee.litIssuedWarnings)!==null&&Qt!==void 0?Qt:ee.litIssuedWarnings=new Set;ce=(e,t)=>{t+=` See https://lit.dev/msg/${e} for more information.`,o.has(t)||(console.warn(t),o.add(t))},ce("dev-mode","Lit is in dev mode. Not recommended for production!"),!((Zt=ee.ShadyDOM)===null||Zt===void 0)&&Zt.inUse&&bt===void 0&&ce("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded."),mn=e=>({then:(t,r)=>{ce("request-update-promise",`The \`requestUpdate\` method should no longer return a Promise but does so on \`${e}\`. Use \`updateComplete\` instead.`),t!==void 0&&t(!1)}})}const to=o=>{ee.emitLitDebugLogEvents&&ee.dispatchEvent(new CustomEvent("lit-debug",{detail:o}))},gn=(o,e)=>o,To={toAttribute(o,e){switch(e){case Boolean:o=o?Pi:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o);break}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}break}return t}},fn=(o,e)=>e!==o&&(e===e||o===o),oo={attribute:!0,type:String,converter:To,reflect:!1,hasChanged:fn},No="finalized";class te extends HTMLElement{constructor(){super(),this.__instanceProperties=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this.__initialize()}static addInitializer(e){var t;this.finalize(),((t=this._initializers)!==null&&t!==void 0?t:this._initializers=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,r)=>{const n=this.__attributeNameForProperty(r,t);n!==void 0&&(this.__attributeToPropertyMap.set(n,r),e.push(n))}),e}static createProperty(e,t=oo){var r;if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const n=typeof e=="symbol"?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,n,t);i!==void 0&&(Object.defineProperty(this.prototype,e,i),this.hasOwnProperty("__reactivePropertyKeys")||(this.__reactivePropertyKeys=new Set((r=this.__reactivePropertyKeys)!==null&&r!==void 0?r:[])),this.__reactivePropertyKeys.add(e))}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(n){const i=this[e];this[t]=n,this.requestUpdate(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||oo}static finalize(){if(this.hasOwnProperty(No))return!1;this[No]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties),this.__attributeToPropertyMap=new Map,this.hasOwnProperty(gn("properties"))){const t=this.properties,r=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of r)this.createProperty(n,t[n])}this.elementStyles=this.finalizeStyles(this.styles);{const t=(r,n=!1)=>{this.prototype.hasOwnProperty(r)&&ce(n?"renamed-api":"removed-api",`\`${r}\` is implemented on class ${this.name}. It has been ${n?"renamed":"removed"} in this version of LitElement.`)};t("initialize"),t("requestUpdateInternal"),t("_getUpdateComplete",!0)}return!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const n of r)t.unshift(wr(n))}else e!==void 0&&t.push(wr(e));return t}static __attributeNameForProperty(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}__initialize(){var e;this.__updatePromise=new Promise(t=>this.enableUpdating=t),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,r;((t=this.__controllers)!==null&&t!==void 0?t:this.__controllers=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)===null||r===void 0||r.call(e))}removeController(e){var t;(t=this.__controllers)===null||t===void 0||t.splice(this.__controllers.indexOf(e)>>>0,1)}__saveInstanceProperties(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this.__instanceProperties.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ti(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostConnected)===null||r===void 0?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)===null||e===void 0||e.forEach(t=>{var r;return(r=t.hostDisconnected)===null||r===void 0?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$attributeToProperty(e,r)}__propertyToAttribute(e,t,r=oo){var n;const i=this.constructor.__attributeNameForProperty(e,r);if(i!==void 0&&r.reflect===!0){const l=(((n=r.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?r.converter:To).toAttribute(t,r.type);this.constructor.enabledWarnings.indexOf("migration")>=0&&l===void 0&&ce("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,l==null?this.removeAttribute(i):this.setAttribute(i,l),this.__reflectingProperty=null}}_$attributeToProperty(e,t){var r;const n=this.constructor,i=n.__attributeToPropertyMap.get(e);if(i!==void 0&&this.__reflectingProperty!==i){const s=n.getPropertyOptions(i),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((r=s.converter)===null||r===void 0?void 0:r.fromAttribute)!==void 0?s.converter:To;this.__reflectingProperty=i,this[i]=l.fromAttribute(t,s.type),this.__reflectingProperty=null}}requestUpdate(e,t,r){let n=!0;return e!==void 0&&(r=r||this.constructor.getPropertyOptions(e),(r.hasChanged||fn)(this[e],t)?(this._$changedProperties.has(e)||this._$changedProperties.set(e,t),r.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties===void 0&&(this.__reflectingProperties=new Map),this.__reflectingProperties.set(e,r))):n=!1),!this.isUpdatePending&&n&&(this.__updatePromise=this.__enqueueUpdate()),mn(this.localName)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e,t;if(!this.isUpdatePending)return;if(to==null||to({kind:"update"}),!this.hasUpdated){const i=[];if((e=this.constructor.__reactivePropertyKeys)===null||e===void 0||e.forEach(s=>{var l;this.hasOwnProperty(s)&&!(!((l=this.__instanceProperties)===null||l===void 0)&&l.has(s))&&i.push(s)}),i.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${i.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}this.__instanceProperties&&(this.__instanceProperties.forEach((i,s)=>this[s]=i),this.__instanceProperties=void 0);let r=!1;const n=this._$changedProperties;try{r=this.shouldUpdate(n),r?(this.willUpdate(n),(t=this.__controllers)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdate)===null||s===void 0?void 0:s.call(i)}),this.update(n)):this.__markUpdated()}catch(i){throw r=!1,this.__markUpdated(),i}r&&this._$didUpdate(n)}willUpdate(e){}_$didUpdate(e){var t;(t=this.__controllers)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostUpdated)===null||n===void 0?void 0:n.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.indexOf("change-in-update")>=0&&ce("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties!==void 0&&(this.__reflectingProperties.forEach((t,r)=>this.__propertyToAttribute(r,this[r],t)),this.__reflectingProperties=void 0),this.__markUpdated()}updated(e){}firstUpdated(e){}}pn=No;te[pn]=!0;te.elementProperties=new Map;te.elementStyles=[];te.shadowRootOptions={mode:"open"};bt==null||bt({ReactiveElement:te});{te.enabledWarnings=["change-in-update"];const o=function(e){e.hasOwnProperty(gn("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};te.enableWarning=function(e){o(this),this.enabledWarnings.indexOf(e)<0&&this.enabledWarnings.push(e)},te.disableWarning=function(e){o(this);const t=this.enabledWarnings.indexOf(e);t>=0&&this.enabledWarnings.splice(t,1)}}((eo=ee.reactiveElementVersions)!==null&&eo!==void 0?eo:ee.reactiveElementVersions=[]).push("1.6.3");ee.reactiveElementVersions.length>1&&ce("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ro,no,io,so;const U=window,v=o=>{U.emitLitDebugLogEvents&&U.dispatchEvent(new CustomEvent("lit-debug",{detail:o}))};let Ai=0,Ct;(ro=U.litIssuedWarnings)!==null&&ro!==void 0||(U.litIssuedWarnings=new Set),Ct=(o,e)=>{e+=o?` See https://lit.dev/msg/${o} for more information.`:"",U.litIssuedWarnings.has(e)||(console.warn(e),U.litIssuedWarnings.add(e))},Ct("dev-mode","Lit is in dev mode. Not recommended for production!");const H=!((no=U.ShadyDOM)===null||no===void 0)&&no.inUse&&((io=U.ShadyDOM)===null||io===void 0?void 0:io.noPatch)===!0?U.ShadyDOM.wrap:o=>o,ze=U.trustedTypes,Sr=ze?ze.createPolicy("lit-html",{createHTML:o=>o}):void 0,Ii=o=>o,Lt=(o,e,t)=>Ii,Ri=o=>{if(_e!==Lt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");_e=o},Oi=()=>{_e=Lt},Po=(o,e,t)=>_e(o,e,t),Ao="$lit$",ne=`lit$${String(Math.random()).slice(9)}$`,vn="?"+ne,zi=`<${vn}>`,xe=document,Ge=()=>xe.createComment(""),Ke=o=>o===null||typeof o!="object"&&typeof o!="function",yn=Array.isArray,Li=o=>yn(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",ao=`[ 	
\f\r]`,Mi=`[^ 	
\f\r"'\`<>=]`,Vi=`[^\\s"'>=/]`,je=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Er=1,lo=2,Di=3,Cr=/-->/g,kr=/>/g,fe=new RegExp(`>|${ao}(?:(${Vi}+)(${ao}*=${ao}*(?:${Mi}|("|')|))|$)`,"g"),Ui=0,$r=1,ji=2,Tr=3,co=/'/g,ho=/"/g,bn=/^(?:script|style|textarea|title)$/i,Fi=1,kt=2,Do=1,$t=2,Bi=3,Hi=4,Wi=5,Uo=6,qi=7,xn=o=>(e,...t)=>(e.some(r=>r===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),{_$litType$:o,strings:e,values:t}),f=xn(Fi),Pe=xn(kt),we=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Nr=new WeakMap,ye=xe.createTreeWalker(xe,129,null,!1);let _e=Lt;function wn(o,e){if(!Array.isArray(o)||!o.hasOwnProperty("raw")){let t="invalid template strings array";throw t=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(t)}return Sr!==void 0?Sr.createHTML(e):e}const Gi=(o,e)=>{const t=o.length-1,r=[];let n=e===kt?"<svg>":"",i,s=je;for(let a=0;a<t;a++){const d=o[a];let c=-1,m,h=0,g;for(;h<d.length&&(s.lastIndex=h,g=s.exec(d),g!==null);)if(h=s.lastIndex,s===je){if(g[Er]==="!--")s=Cr;else if(g[Er]!==void 0)s=kr;else if(g[lo]!==void 0)bn.test(g[lo])&&(i=new RegExp(`</${g[lo]}`,"g")),s=fe;else if(g[Di]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else s===fe?g[Ui]===">"?(s=i??je,c=-1):g[$r]===void 0?c=-2:(c=s.lastIndex-g[ji].length,m=g[$r],s=g[Tr]===void 0?fe:g[Tr]==='"'?ho:co):s===ho||s===co?s=fe:s===Cr||s===kr?s=je:(s=fe,i=void 0);console.assert(c===-1||s===fe||s===co||s===ho,"unexpected parse state B");const se=s===fe&&o[a+1].startsWith("/>")?" ":"";n+=s===je?d+zi:c>=0?(r.push(m),d.slice(0,c)+Ao+d.slice(c)+ne+se):d+ne+(c===-2?(r.push(void 0),a):se)}const l=n+(o[t]||"<?>")+(e===kt?"</svg>":"");return[wn(o,l),r]};class Ye{constructor({strings:e,["_$litType$"]:t},r){this.parts=[];let n,i=0,s=0;const l=e.length-1,a=this.parts,[d,c]=Gi(e,t);if(this.el=Ye.createElement(d,r),ye.currentNode=this.el.content,t===kt){const m=this.el.content,h=m.firstChild;h.remove(),m.append(...h.childNodes)}for(;(n=ye.nextNode())!==null&&a.length<l;){if(n.nodeType===1){{const m=n.localName;if(/^(?:textarea|template)$/i.test(m)&&n.innerHTML.includes(ne)){const h=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(h);Ct("",h)}}if(n.hasAttributes()){const m=[];for(const h of n.getAttributeNames())if(h.endsWith(Ao)||h.startsWith(ne)){const g=c[s++];if(m.push(h),g!==void 0){const ae=n.getAttribute(g.toLowerCase()+Ao).split(ne),oe=/([.?@])?(.*)/.exec(g);a.push({type:Do,index:i,name:oe[2],strings:ae,ctor:oe[1]==="."?Yi:oe[1]==="?"?Xi:oe[1]==="@"?Qi:Mt})}else a.push({type:Uo,index:i})}for(const h of m)n.removeAttribute(h)}if(bn.test(n.tagName)){const m=n.textContent.split(ne),h=m.length-1;if(h>0){n.textContent=ze?ze.emptyScript:"";for(let g=0;g<h;g++)n.append(m[g],Ge()),ye.nextNode(),a.push({type:$t,index:++i});n.append(m[h],Ge())}}}else if(n.nodeType===8)if(n.data===vn)a.push({type:$t,index:i});else{let h=-1;for(;(h=n.data.indexOf(ne,h+1))!==-1;)a.push({type:qi,index:i}),h+=ne.length-1}i++}v==null||v({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,t){const r=xe.createElement("template");return r.innerHTML=e,r}}function Le(o,e,t=o,r){var n,i,s,l;if(e===we)return e;let a=r!==void 0?(n=t.__directives)===null||n===void 0?void 0:n[r]:t.__directive;const d=Ke(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((i=a==null?void 0:a._$notifyDirectiveConnectionChanged)===null||i===void 0||i.call(a,!1),d===void 0?a=void 0:(a=new d(o),a._$initialize(o,t,r)),r!==void 0?((s=(l=t).__directives)!==null&&s!==void 0?s:l.__directives=[])[r]=a:t.__directive=a),a!==void 0&&(e=Le(o,a._$resolve(o,e.values),a,r)),e}class Ki{constructor(e,t){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=t}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){var t;const{el:{content:r},parts:n}=this._$template,i=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:xe).importNode(r,!0);ye.currentNode=i;let s=ye.nextNode(),l=0,a=0,d=n[0];for(;d!==void 0;){if(l===d.index){let c;d.type===$t?c=new ot(s,s.nextSibling,this,e):d.type===Do?c=new d.ctor(s,d.name,d.strings,this,e):d.type===Uo&&(c=new Zi(s,this,e)),this._$parts.push(c),d=n[++a]}l!==(d==null?void 0:d.index)&&(s=ye.nextNode(),l++)}return ye.currentNode=xe,i}_update(e){let t=0;for(const r of this._$parts)r!==void 0&&(v==null||v({kind:"set part",part:r,value:e[t],valueIndex:t,values:e,templateInstance:this}),r.strings!==void 0?(r._$setValue(e,r,t),t+=r.strings.length-2):r._$setValue(e[t])),t++}}class ot{constructor(e,t,r,n){var i;this.type=$t,this._$committedValue=k,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=t,this._$parent=r,this.options=n,this.__isConnected=(i=n==null?void 0:n.isConnected)!==null&&i!==void 0?i:!0,this._textSanitizer=void 0}get _$isConnected(){var e,t;return(t=(e=this._$parent)===null||e===void 0?void 0:e._$isConnected)!==null&&t!==void 0?t:this.__isConnected}get parentNode(){let e=H(this._$startNode).parentNode;const t=this._$parent;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,t=this){var r;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Le(this,e,t),Ke(e))e===k||e==null||e===""?(this._$committedValue!==k&&(v==null||v({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=k):e!==this._$committedValue&&e!==we&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((r=this.options)===null||r===void 0?void 0:r.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else Li(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return H(H(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var t;if(this._$committedValue!==e){if(this._$clear(),_e!==Lt){const r=(t=this._$startNode.parentNode)===null||t===void 0?void 0:t.nodeName;if(r==="STYLE"||r==="SCRIPT"){let n="Forbidden";throw r==="STYLE"?n="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":n="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(n)}}v==null||v({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==k&&Ke(this._$committedValue)){const t=H(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Po(t,"data","property")),e=this._textSanitizer(e),v==null||v({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}else{const t=xe.createTextNode("");this._commitNode(t),this._textSanitizer===void 0&&(this._textSanitizer=Po(t,"data","property")),e=this._textSanitizer(e),v==null||v({kind:"commit text",node:t,value:e,options:this.options}),t.data=e}this._$committedValue=e}_commitTemplateResult(e){var t;const{values:r,["_$litType$"]:n}=e,i=typeof n=="number"?this._$getTemplate(e):(n.el===void 0&&(n.el=Ye.createElement(wn(n.h,n.h[0]),this.options)),n);if(((t=this._$committedValue)===null||t===void 0?void 0:t._$template)===i)v==null||v({kind:"template updating",template:i,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:r}),this._$committedValue._update(r);else{const s=new Ki(i,this),l=s._clone(this.options);v==null||v({kind:"template instantiated",template:i,instance:s,parts:s._$parts,options:this.options,fragment:l,values:r}),s._update(r),v==null||v({kind:"template instantiated and updated",template:i,instance:s,parts:s._$parts,options:this.options,fragment:l,values:r}),this._commitNode(l),this._$committedValue=s}}_$getTemplate(e){let t=Nr.get(e.strings);return t===void 0&&Nr.set(e.strings,t=new Ye(e)),t}_commitIterable(e){yn(this._$committedValue)||(this._$committedValue=[],this._$clear());const t=this._$committedValue;let r=0,n;for(const i of e)r===t.length?t.push(n=new ot(this._insert(Ge()),this._insert(Ge()),this,this.options)):n=t[r],n._$setValue(i),r++;r<t.length&&(this._$clear(n&&H(n._$endNode).nextSibling,r),t.length=r)}_$clear(e=H(this._$startNode).nextSibling,t){var r;for((r=this._$notifyConnectionChanged)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$endNode;){const n=H(e).nextSibling;H(e).remove(),e=n}}setConnected(e){var t;if(this._$parent===void 0)this.__isConnected=e,(t=this._$notifyConnectionChanged)===null||t===void 0||t.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Mt{constructor(e,t,r,n,i){this.type=Do,this._$committedValue=k,this._$disconnectableChildren=void 0,this.element=e,this.name=t,this._$parent=n,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$committedValue=new Array(r.length-1).fill(new String),this.strings=r):this._$committedValue=k,this._sanitizer=void 0}get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e,t=this,r,n){const i=this.strings;let s=!1;if(i===void 0)e=Le(this,e,t,0),s=!Ke(e)||e!==this._$committedValue&&e!==we,s&&(this._$committedValue=e);else{const l=e;e=i[0];let a,d;for(a=0;a<i.length-1;a++)d=Le(this,l[r+a],t,a),d===we&&(d=this._$committedValue[a]),s||(s=!Ke(d)||d!==this._$committedValue[a]),d===k?e=k:e!==k&&(e+=(d??"")+i[a+1]),this._$committedValue[a]=d}s&&!n&&this._commitValue(e)}_commitValue(e){e===k?H(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"attribute")),e=this._sanitizer(e??""),v==null||v({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),H(this.element).setAttribute(this.name,e??""))}}class Yi extends Mt{constructor(){super(...arguments),this.type=Bi}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"property")),e=this._sanitizer(e),v==null||v({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===k?void 0:e}}const Ji=ze?ze.emptyScript:"";class Xi extends Mt{constructor(){super(...arguments),this.type=Hi}_commitValue(e){v==null||v({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==k),options:this.options}),e&&e!==k?H(this.element).setAttribute(this.name,Ji):H(this.element).removeAttribute(this.name)}}class Qi extends Mt{constructor(e,t,r,n,i){if(super(e,t,r,n,i),this.type=Wi,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${t}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,t=this){var r;if(e=(r=Le(this,e,t,0))!==null&&r!==void 0?r:k,e===we)return;const n=this._$committedValue,i=e===k&&n!==k||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==k&&(n===k||i);v==null||v({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:i,addListener:s,oldListener:n}),i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var t,r;typeof this._$committedValue=="function"?this._$committedValue.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$committedValue.handleEvent(e)}}class Zi{constructor(e,t,r){this.element=e,this.type=Uo,this._$disconnectableChildren=void 0,this._$parent=t,this.options=r}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){v==null||v({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Le(this,e)}}const uo=U.litHtmlPolyfillSupportDevMode;uo==null||uo(Ye,ot);((so=U.litHtmlVersions)!==null&&so!==void 0?so:U.litHtmlVersions=[]).push("2.8.0");U.litHtmlVersions.length>1&&Ct("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const Re=(o,e,t)=>{var r,n;if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const i=Ai++,s=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:e;let l=s._$litPart$;if(v==null||v({kind:"begin render",id:i,value:o,container:e,options:t,part:l}),l===void 0){const a=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;s._$litPart$=l=new ot(e.insertBefore(Ge(),a),a,void 0,t??{})}return l._$setValue(o),v==null||v({kind:"end render",id:i,value:o,container:e,options:t,part:l}),l};Re.setSanitizer=Ri,Re.createSanitizer=Po,Re._testOnlyClearSanitizerFactoryDoNotCallOrElse=Oi;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var po,mo,go;let jo;{const o=(po=globalThis.litIssuedWarnings)!==null&&po!==void 0?po:globalThis.litIssuedWarnings=new Set;jo=(e,t)=>{t+=` See https://lit.dev/msg/${e} for more information.`,o.has(t)||(console.warn(t),o.add(t))}}class A extends te{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=Re(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!1)}render(){return we}}A.finalized=!0;A._$litElement$=!0;(mo=globalThis.litElementHydrateSupport)===null||mo===void 0||mo.call(globalThis,{LitElement:A});const fo=globalThis.litElementPolyfillSupportDevMode;fo==null||fo({LitElement:A});A.finalize=function(){if(!te.finalize.call(this))return!1;const e=(t,r,n=!1)=>{if(t.hasOwnProperty(r)){const i=(typeof t=="function"?t:t.constructor).name;jo(n?"renamed-api":"removed-api",`\`${r}\` is implemented on class ${i}. It has been ${n?"renamed":"removed"} in this version of LitElement.`)}};return e(this,"render"),e(this,"getStyles",!0),e(this.prototype,"adoptStyles"),!0};((go=globalThis.litElementVersions)!==null&&go!==void 0?go:globalThis.litElementVersions=[]).push("3.3.3");globalThis.litElementVersions.length>1&&jo("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const es=(o,e)=>(customElements.define(o,e),e),ts=(o,e)=>{const{kind:t,elements:r}=e;return{kind:t,elements:r,finisher(n){customElements.define(o,n)}}},F=o=>e=>typeof e=="function"?es(o,e):ts(o,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const os=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}},rs=(o,e,t)=>{e.constructor.createProperty(t,o)};function y(o){return(e,t)=>t!==void 0?rs(o,e,t):os(o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(o){return y({...o,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ns=({finisher:o,descriptor:e})=>(t,r)=>{var n;if(r!==void 0){const i=t.constructor;e!==void 0&&Object.defineProperty(t,r,e(r)),o==null||o(i,r)}else{const i=(n=t.originalKey)!==null&&n!==void 0?n:t.key,s=e!=null?{kind:"method",placement:"prototype",key:i,descriptor:e(t.key)}:{...t,key:i};return o!=null&&(s.finisher=function(l){o(l,i)}),s}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function rt(o,e){return ns({descriptor:t=>{const r={get(){var n,i;return(i=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(o))!==null&&i!==void 0?i:null},enumerable:!0,configurable:!0};if(e){const n=typeof t=="symbol"?Symbol():`__${t}`;r.get=function(){var i,s;return this[n]===void 0&&(this[n]=(s=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(o))!==null&&s!==void 0?s:null),this[n]}}return r}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var vo;const is=window;((vo=is.HTMLSlotElement)===null||vo===void 0?void 0:vo.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ss={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},as=o=>(...e)=>({_$litDirective$:o,values:e});class ls{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,t,r){this.__part=e,this._$parent=t,this.__attributeIndex=r}_$resolve(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ds extends ls{constructor(e){var t;if(super(e),e.type!==ss.ATTRIBUTE||e.name!=="class"||((t=e.strings)===null||t===void 0?void 0:t.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var r,n;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in t)t[s]&&!(!((r=this._staticClasses)===null||r===void 0)&&r.has(s))&&this._previousClasses.add(s);return this.render(t)}const i=e.element.classList;this._previousClasses.forEach(s=>{s in t||(i.remove(s),this._previousClasses.delete(s))});for(const s in t){const l=!!t[s];l!==this._previousClasses.has(s)&&!(!((n=this._staticClasses)===null||n===void 0)&&n.has(s))&&(l?(i.add(s),this._previousClasses.add(s)):(i.remove(s),this._previousClasses.delete(s)))}return we}}const Fo=as(ds),yo="css-loading-indicator";var G;(function(o){o.IDLE="",o.FIRST="first",o.SECOND="second",o.THIRD="third"})(G||(G={}));class I extends A{constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=G.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=$.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,t;const r=window;return!((e=r.Vaadin)===null||e===void 0)&&e.connectionIndicator||(r.Vaadin=r.Vaadin||{},r.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(r.Vaadin.connectionIndicator)),(t=r.Vaadin)===null||t===void 0?void 0:t.connectionIndicator}render(){return f`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Fo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const t=window;!((e=t.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=t.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const t=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=t===$.CONNECTION_LOST,this.reconnecting=t===$.RECONNECTING,this.updateLoading(t===$.LOADING),this.loading?!1:t!==this.lastMessageState?(this.lastMessageState=t,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=G.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=G.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=G.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=G.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(yo)){const e=document.createElement("style");e.id=yo,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(yo);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case G.IDLE:return"display: none";case G.FIRST:case G.SECOND:case G.THIRD:return"display: block";default:return""}}timeoutFor(e,t,r,n){return e!==0&&window.clearTimeout(e),t?window.setTimeout(r,n):0}static get instance(){return I.create()}}j([y({type:Number})],I.prototype,"firstDelay",void 0);j([y({type:Number})],I.prototype,"secondDelay",void 0);j([y({type:Number})],I.prototype,"thirdDelay",void 0);j([y({type:Number})],I.prototype,"expandedDuration",void 0);j([y({type:String})],I.prototype,"onlineText",void 0);j([y({type:String})],I.prototype,"offlineText",void 0);j([y({type:String})],I.prototype,"reconnectingText",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"offline",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"reconnecting",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"expanded",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"loading",void 0);j([y({type:String})],I.prototype,"loadingBarState",void 0);j([y({type:Boolean})],I.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",I);I.instance;const Je=window;Je.Vaadin=Je.Vaadin||{};Je.Vaadin.registrations=Je.Vaadin.registrations||[];Je.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class Pr extends Error{}const Fe=window.document.body,_=window;class cs{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Fe.$=Fe.$||[],this.config=e||{},_.Vaadin=_.Vaadin||{},_.Vaadin.Flow=_.Vaadin.Flow||{},_.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const t=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||t&&t.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,_.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,_.Vaadin.connectionState.loadingFinished(),!_.Vaadin.listener&&(_.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(t=>t.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,_.Vaadin.connectionState.online)try{await this.flowInit()}catch(t){if(t instanceof Pr)return _.Vaadin.connectionState.state=$.CONNECTION_LOST,this.offlineStubAction();throw t}else return this.offlineStubAction();return this.container.onBeforeEnter=(t,r)=>this.flowNavigate(t,r),this.container.onBeforeLeave=(t,r)=>this.flowLeave(t,r),this.container}}async flowLeave(e,t){const{connectionState:r}=_.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||r.offline?Promise.resolve({}):new Promise(n=>{this.loadingStarted(),this.container.serverConnected=i=>{n(t&&i?t.prevent():{}),this.loadingFinished()},Fe.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,t){return this.response?new Promise(r=>{this.loadingStarted(),this.container.serverConnected=(n,i)=>{t&&n?r(t.prevent()):t&&t.redirect&&i?r(t.redirect(i.pathname)):(this.container.style.display="",r(this.container)),this.loadingFinished()},Fe.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:t}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:r}=t;await(await E(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(r),await this.config.imports());const i=`flow-container-${r.toLowerCase()}`,s=document.querySelector(i);s?this.container=s:(this.container=document.createElement(i),this.container.id=r),Fe.$[r]=this.container;const l=await E(()=>import("./FlowClient-341d667e.js"),[],import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((t,r)=>{const n=document.createElement("script");n.onload=()=>t(),n.onerror=r,n.src=e,document.body.appendChild(n)})}injectAppIdScript(e){const t=e.substring(0,e.lastIndexOf("-")),r=document.createElement("script");r.type="module",r.setAttribute("data-app-id",t),document.body.append(r)}async flowInitClient(e){return e.init(),new Promise(t=>{const r=setInterval(()=>{Object.keys(_.Vaadin.Flow.clients).filter(i=>i!=="TypeScript").reduce((i,s)=>i||_.Vaadin.Flow.clients[s].isActive(),!1)||(clearInterval(r),t())},5)})}async flowInitUi(){const e=_.Vaadin&&_.Vaadin.TypeScript&&_.Vaadin.TypeScript.initial;return e?(_.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((t,r)=>{const i=new XMLHttpRequest,s=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;i.open("GET",s),i.onerror=()=>r(new Pr(`Invalid server response when initializing Flow UI.
        ${i.status}
        ${i.responseText}`)),i.onload=()=>{const l=i.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?t(JSON.parse(i.responseText)):i.onerror()},i.send()})}addConnectionIndicator(){I.create(),_.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){_.Vaadin.connectionState.state=$.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{_.Vaadin.connectionState.state=$.CONNECTED},e.onerror=()=>{_.Vaadin.connectionState.state=$.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),_.addEventListener("offline",()=>{this.isFlowClientLoaded()||(_.Vaadin.connectionState.state=$.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),t="./offline-stub.html";e.setAttribute("src",t),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let r;const n=()=>{r!==void 0&&(_.Vaadin.connectionState.removeStateChangeListener(r),r=void 0)};return e.onBeforeEnter=(i,s,l)=>{r=()=>{_.Vaadin.connectionState.online&&(n(),l.render(i,!1))},_.Vaadin.connectionState.addStateChangeListener(r)},e.onBeforeLeave=(i,s,l)=>{n()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:hs}=new cs({imports:()=>E(()=>import("./generated-flow-imports-532e9064.js"),[],import.meta.url)}),us=[...hs],ps=new de(document.querySelector("#outlet"));ps.setRoutes(us);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var o="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),t=new WeakMap,r=typeof DOMException=="object"?Error:DOMException,n=Object.defineProperty,i=Array.prototype.forEach,s=/@import.+?;?$/gm;function l(u){var p=u.replace(s,"");return p!==u&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),p.trim()}function a(u){return"isConnected"in u?u.isConnected:document.contains(u)}function d(u){return u.filter(function(p,b){return u.indexOf(p)===b})}function c(u,p){return u.filter(function(b){return p.indexOf(b)===-1})}function m(u){u.parentNode.removeChild(u)}function h(u){return u.shadowRoot||t.get(u)}var g=["addRule","deleteRule","insertRule","removeRule"],se=CSSStyleSheet,ae=se.prototype;ae.replace=function(){return Promise.reject(new r("Can't call replace on non-constructed CSSStyleSheets."))},ae.replaceSync=function(){throw new r("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function oe(u){return typeof u=="object"?ke.isPrototypeOf(u)||ae.isPrototypeOf(u):!1}function Wt(u){return typeof u=="object"?ae.isPrototypeOf(u):!1}var B=new WeakMap,X=new WeakMap,Ee=new WeakMap,Ce=new WeakMap;function qt(u,p){var b=document.createElement("style");return Ee.get(u).set(p,b),X.get(u).push(p),b}function re(u,p){return Ee.get(u).get(p)}function it(u,p){Ee.get(u).delete(p),X.set(u,X.get(u).filter(function(b){return b!==p}))}function Xo(u,p){requestAnimationFrame(function(){p.textContent=B.get(u).textContent,Ce.get(u).forEach(function(b){return p.sheet[b.method].apply(p.sheet,b.args)})})}function st(u){if(!B.has(u))throw new TypeError("Illegal invocation")}function Gt(){var u=this,p=document.createElement("style");e.body.appendChild(p),B.set(u,p),X.set(u,[]),Ee.set(u,new WeakMap),Ce.set(u,[])}var ke=Gt.prototype;ke.replace=function(p){try{return this.replaceSync(p),Promise.resolve(this)}catch(b){return Promise.reject(b)}},ke.replaceSync=function(p){if(st(this),typeof p=="string"){var b=this;B.get(b).textContent=l(p),Ce.set(b,[]),X.get(b).forEach(function(z){z.isConnected()&&Xo(b,re(b,z))})}},n(ke,"cssRules",{configurable:!0,enumerable:!0,get:function(){return st(this),B.get(this).sheet.cssRules}}),n(ke,"media",{configurable:!0,enumerable:!0,get:function(){return st(this),B.get(this).sheet.media}}),g.forEach(function(u){ke[u]=function(){var p=this;st(p);var b=arguments;Ce.get(p).push({method:u,args:b}),X.get(p).forEach(function(V){if(V.isConnected()){var R=re(p,V).sheet;R[u].apply(R,b)}});var z=B.get(p).sheet;return z[u].apply(z,b)}}),n(Gt,Symbol.hasInstance,{configurable:!0,value:oe});var Qo={childList:!0,subtree:!0},Zo=new WeakMap;function $e(u){var p=Zo.get(u);return p||(p=new or(u),Zo.set(u,p)),p}function er(u){n(u.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return $e(this).sheets},set:function(p){$e(this).update(p)}})}function Kt(u,p){for(var b=document.createNodeIterator(u,NodeFilter.SHOW_ELEMENT,function(V){return h(V)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),z=void 0;z=b.nextNode();)p(h(z))}var at=new WeakMap,Te=new WeakMap,lt=new WeakMap;function Ln(u,p){return p instanceof HTMLStyleElement&&Te.get(u).some(function(b){return re(b,u)})}function tr(u){var p=at.get(u);return p instanceof Document?p.body:p}function Yt(u){var p=document.createDocumentFragment(),b=Te.get(u),z=lt.get(u),V=tr(u);z.disconnect(),b.forEach(function(R){p.appendChild(re(R,u)||qt(R,u))}),V.insertBefore(p,null),z.observe(V,Qo),b.forEach(function(R){Xo(R,re(R,u))})}function or(u){var p=this;p.sheets=[],at.set(p,u),Te.set(p,[]),lt.set(p,new MutationObserver(function(b,z){if(!document){z.disconnect();return}b.forEach(function(V){o||i.call(V.addedNodes,function(R){R instanceof Element&&Kt(R,function(Ne){$e(Ne).connect()})}),i.call(V.removedNodes,function(R){R instanceof Element&&(Ln(p,R)&&Yt(p),o||Kt(R,function(Ne){$e(Ne).disconnect()}))})})}))}if(or.prototype={isConnected:function(){var u=at.get(this);return u instanceof Document?u.readyState!=="loading":a(u.host)},connect:function(){var u=tr(this);lt.get(this).observe(u,Qo),Te.get(this).length>0&&Yt(this),Kt(u,function(p){$e(p).connect()})},disconnect:function(){lt.get(this).disconnect()},update:function(u){var p=this,b=at.get(p)===document?"Document":"ShadowRoot";if(!Array.isArray(u))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Iterator getter is not callable.");if(!u.every(oe))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Failed to convert value to 'CSSStyleSheet'");if(u.some(Wt))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Can't adopt non-constructed stylesheets");p.sheets=u;var z=Te.get(p),V=d(u),R=c(z,V);R.forEach(function(Ne){m(re(Ne,p)),it(Ne,p)}),Te.set(p,V),p.isConnected()&&V.length>0&&Yt(p)}},window.CSSStyleSheet=Gt,er(Document),"ShadowRoot"in window){er(ShadowRoot);var rr=Element.prototype,Mn=rr.attachShadow;rr.attachShadow=function(p){var b=Mn.call(this,p);return p.mode==="closed"&&t.set(this,b),b}}var dt=$e(document);dt.isConnected()?dt.connect():document.addEventListener("DOMContentLoaded",dt.connect.bind(dt))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _n=Symbol.for(""),ms=o=>{if((o==null?void 0:o.r)===_n)return o==null?void 0:o._$litStatic$},gs=o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},ut=(o,...e)=>({_$litStatic$:e.reduce((t,r,n)=>t+gs(r)+o[n+1],o[0]),r:_n}),Ar=new Map,fs=o=>(e,...t)=>{const r=t.length;let n,i;const s=[],l=[];let a=0,d=!1,c;for(;a<r;){for(c=e[a];a<r&&(i=t[a],(n=ms(i))!==void 0);)c+=n+e[++a],d=!0;a!==r&&l.push(i),s.push(c),a++}if(a===r&&s.push(e[r]),d){const m=s.join("$$lit$$");e=Ar.get(m),e===void 0&&(s.raw=s,Ar.set(m,e=s)),t=l}return o(e,...t)},vs=fs(f),ys="modulepreload",bs=function(o){return"/"+o},Ir={},S=function(o,e,t){if(!e||e.length===0)return o();const r=document.getElementsByTagName("link");return Promise.all(e.map(n=>{if(n=bs(n),n in Ir)return;Ir[n]=!0;const i=n.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(t)for(let a=r.length-1;a>=0;a--){const d=r[a];if(d.href===n&&(!i||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${s}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":ys,i||(l.as="script",l.crossOrigin=""),l.href=n,document.head.appendChild(l),i)return new Promise((a,d)=>{l.addEventListener("load",a),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>o()).catch(n=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=n,window.dispatchEvent(i),!i.defaultPrevented)throw n})};function xs(o){var e;const t=[];for(;o&&o.parentNode;){const r=ws(o);if(r.nodeId!==-1){if((e=r.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;t.push(r)}o=o.parentElement?o.parentElement:o.parentNode.host}return t.reverse()}function ws(o){const e=window.Vaadin;if(e&&e.Flow){const{clients:t}=e.Flow,r=Object.keys(t);for(const n of r){const i=t[n];if(i.getNodeId){const s=i.getNodeId(o);if(s>=0)return{nodeId:s,uiId:i.getUIId(),element:o}}}}return{nodeId:-1,uiId:-1,element:void 0}}function _s(o,e){if(o.contains(e))return!0;let t=e;const r=e.ownerDocument;for(;t&&t!==r&&t!==o;)t=t.parentNode||(t instanceof ShadowRoot?t.host:null);return t===o}const Ss=(o,e)=>{const t=o[e];return t?typeof t=="function"?t():Promise.resolve(t):new Promise((r,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var P=(o=>(o.text="text",o.checkbox="checkbox",o.range="range",o.color="color",o))(P||{});const J={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},Es=Object.freeze(Object.defineProperty({__proto__:null,presets:J},Symbol.toStringTag,{value:"Module"})),Be={textColor:{propertyName:"color",displayName:"Text color",editorType:P.color,presets:J.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:P.range,presets:J.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:P.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:P.checkbox,checkedValue:"italic"}},Ae={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:P.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:P.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:P.range,presets:J.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:P.range,presets:J.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:P.range,presets:J.lumoSpace,icon:"square"}},Cs={height:{propertyName:"height",displayName:"Size",editorType:P.range,presets:J.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"}},ks={iconColor:{propertyName:"color",displayName:"Icon color",editorType:P.color,presets:J.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:P.range,presets:J.lumoFontSize,icon:"font"}},$s=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:Cs,iconProperties:ks,shapeProperties:Ae,textProperties:Be},Symbol.toStringTag,{value:"Module"}));function Sn(o){const e=o.charAt(0).toUpperCase()+o.slice(1);return{tagName:o,displayName:e,elements:[{selector:o,displayName:"Element",properties:[Ae.backgroundColor,Ae.borderColor,Ae.borderWidth,Ae.borderRadius,Ae.padding,Be.textColor,Be.fontSize,Be.fontWeight,Be.fontStyle]}]}}const Ts=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:Sn},Symbol.toStringTag,{value:"Module"})),Ns=o=>Ss(Object.assign({"./components/defaults.ts":()=>S(()=>Promise.resolve().then(()=>$s),void 0),"./components/generic.ts":()=>S(()=>Promise.resolve().then(()=>Ts),void 0),"./components/presets.ts":()=>S(()=>Promise.resolve().then(()=>Es),void 0),"./components/vaadin-app-layout.ts":()=>S(()=>E(()=>import("./vaadin-app-layout-37492a04-7d5303c3.js"),[],import.meta.url),[]),"./components/vaadin-avatar.ts":()=>S(()=>E(()=>import("./vaadin-avatar-7047be31-b385d9f7.js"),[],import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>S(()=>E(()=>import("./vaadin-big-decimal-field-b42c1de1-b31ebd5b.js"),["./vaadin-big-decimal-field-b42c1de1-b31ebd5b.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-big-decimal-field-b42c1de1.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-button.ts":()=>S(()=>E(()=>import("./vaadin-button-79ad9d5f-ae352b96.js"),[],import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>S(()=>E(()=>import("./vaadin-checkbox-group-a9a9e85d-9c23f92b.js"),["./vaadin-checkbox-group-a9a9e85d-9c23f92b.js","./vaadin-text-field-e82c445d-245a0944.js","./vaadin-checkbox-13797fc9-d3723e47.js"],import.meta.url),["assets/vaadin-checkbox-group-a9a9e85d.js","assets/vaadin-text-field-e82c445d.js","assets/vaadin-checkbox-13797fc9.js"]),"./components/vaadin-checkbox.ts":()=>S(()=>E(()=>import("./vaadin-checkbox-13797fc9-d3723e47.js"),[],import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>S(()=>E(()=>import("./vaadin-combo-box-9046f78f-2738a2d5.js"),["./vaadin-combo-box-9046f78f-2738a2d5.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-combo-box-9046f78f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-email-field.ts":()=>S(()=>E(()=>import("./vaadin-email-field-da851bcb-443869ae.js"),["./vaadin-email-field-da851bcb-443869ae.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-email-field-da851bcb.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-horizontal-layout.ts":()=>S(()=>E(()=>import("./vaadin-horizontal-layout-f7b1ab51-82fee49a.js"),[],import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>S(()=>E(()=>import("./vaadin-integer-field-6e2954cf-0afa6579.js"),["./vaadin-integer-field-6e2954cf-0afa6579.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-integer-field-6e2954cf.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-menu-bar.ts":()=>S(()=>E(()=>import("./vaadin-menu-bar-be33385c-a5092e21.js"),[],import.meta.url),[]),"./components/vaadin-number-field.ts":()=>S(()=>E(()=>import("./vaadin-number-field-31df11f5-7ea8170d.js"),["./vaadin-number-field-31df11f5-7ea8170d.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-number-field-31df11f5.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-password-field.ts":()=>S(()=>E(()=>import("./vaadin-password-field-49ffb113-22d546ad.js"),["./vaadin-password-field-49ffb113-22d546ad.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-password-field-49ffb113.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-progress-bar.ts":()=>S(()=>E(()=>import("./vaadin-progress-bar-3b53bb70-1a81e504.js"),[],import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>S(()=>E(()=>import("./vaadin-radio-group-4a6e2cf4-7d28cee0.js"),["./vaadin-radio-group-4a6e2cf4-7d28cee0.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-radio-group-4a6e2cf4.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-scroller.ts":()=>S(()=>E(()=>import("./vaadin-scroller-35e68818-05a70d14.js"),[],import.meta.url),[]),"./components/vaadin-select.ts":()=>S(()=>E(()=>import("./vaadin-select-5d6ab45b-9cfeeb23.js"),["./vaadin-select-5d6ab45b-9cfeeb23.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-select-5d6ab45b.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-split-layout.ts":()=>S(()=>E(()=>import("./vaadin-split-layout-10c9713b-49d859aa.js"),[],import.meta.url),[]),"./components/vaadin-text-area.ts":()=>S(()=>E(()=>import("./vaadin-text-area-41c5f60c-1b0cd161.js"),["./vaadin-text-area-41c5f60c-1b0cd161.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-text-area-41c5f60c.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-text-field.ts":()=>S(()=>E(()=>import("./vaadin-text-field-e82c445d-245a0944.js"),[],import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>S(()=>E(()=>import("./vaadin-time-picker-2fa5314f-afa53a7c.js"),["./vaadin-time-picker-2fa5314f-afa53a7c.js","./vaadin-text-field-e82c445d-245a0944.js"],import.meta.url),["assets/vaadin-time-picker-2fa5314f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-vertical-layout.ts":()=>S(()=>E(()=>import("./vaadin-vertical-layout-ff73c403-6cded5ac.js"),[],import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>S(()=>E(()=>import("./vaadin-virtual-list-62d4499a-4e1044c8.js"),[],import.meta.url),[])}),`./components/${o}.ts`);class Ps{constructor(e=Ns){this.loader=e,this.metadata={}}async getMetadata(e){var t;const r=(t=e.element)==null?void 0:t.localName;if(!r)return null;if(!r.startsWith("vaadin-"))return Sn(r);let n=this.metadata[r];if(n)return n;try{n=(await this.loader(r)).default,this.metadata[r]=n}catch{console.warn(`Failed to load metadata for component: ${r}`)}return n||null}}const As=new Ps,xt={crosshair:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Pe`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Xe=(o=>(o.disabled="disabled",o.enabled="enabled",o.missing_theme="missing_theme",o))(Xe||{}),D=(o=>(o.local="local",o.global="global",o))(D||{});function bo(o,e){return`${o}|${e}`}class he{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,t){return this._properties[bo(e,t)]||null}updatePropertyValue(e,t,r,n){if(!r){delete this._properties[bo(e,t)];return}let i=this.getPropertyValue(e,t);i?(i.value=r,i.modified=n||!1):(i={elementSelector:e,propertyName:t,value:r,modified:n||!1},this._properties[bo(e,t)]=i)}addPropertyValues(e){e.forEach(t=>{this.updatePropertyValue(t.elementSelector,t.propertyName,t.value,t.modified)})}getPropertyValuesForElement(e){return this.properties.filter(t=>t.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const t=new he(e[0].metadata);return e.forEach(r=>t.addPropertyValues(r.properties)),t}static fromServerRules(e,t,r){const n=new he(e);return e.elements.forEach(i=>{const s=Me(i,t),l=r.find(a=>a.selector===s);l&&i.properties.forEach(a=>{const d=l.properties[a.propertyName];d&&n.updatePropertyValue(i.selector,a.propertyName,d,!0)})}),n}}function Me(o,e){const t=o.selector;if(e.themeScope==="global")return t;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const r=t.match(/^[\w\d-_]+/),n=r&&r[0];if(!n)throw new Error(`Selector does not start with a tag name: ${t}`);return`${n}.${e.localClassName}${t.substring(n.length,t.length)}`}function Is(o,e,t,r){const n=Me(o,e),i={[t]:r};return t==="border-width"&&(parseInt(r)>0?i["border-style"]="solid":i["border-style"]=""),{selector:n,properties:i}}function Rs(o){const e=Object.entries(o.properties).map(([t,r])=>`${t}: ${r};`).join(" ");return`${o.selector} { ${e} }`}let pt,Rr="";function Bo(o){pt||(pt=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,pt]),Rr+=o.cssText,pt.replaceSync(Rr)}const En=x`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,Or="__vaadin-theme-editor-measure-element",zr=/((::before)|(::after))$/,Lr=/::part\(([\w\d_-]+)\)$/;Bo(x`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Os(o){const e=new he(o),t=document.createElement(o.tagName);t.classList.add(Or),document.body.append(t),o.setupElement&&await o.setupElement(t);const r={themeScope:D.local,localClassName:Or};try{o.elements.forEach(n=>{Mr(t,n,r,!0);let i=Me(n,r);const s=i.match(zr);i=i.replace(zr,"");const l=i.match(Lr),a=i.replace(Lr,"");let d=document.querySelector(a);if(d&&l){const h=`[part~="${l[1]}"]`;d=d.shadowRoot.querySelector(h)}if(!d)return;d.style.transition="none";const c=s?s[1]:null,m=getComputedStyle(d,c);n.properties.forEach(h=>{const g=m.getPropertyValue(h.propertyName)||h.defaultValue||"";e.updatePropertyValue(n.selector,h.propertyName,g)}),Mr(t,n,r,!1)})}finally{try{o.cleanupElement&&await o.cleanupElement(t)}finally{t.remove()}}return e}function Mr(o,e,t,r){if(e.stateAttribute){if(e.stateElementSelector){const n=Me({...e,selector:e.stateElementSelector},t);o=document.querySelector(n)}o&&(r?o.setAttribute(e.stateAttribute,""):o.removeAttribute(e.stateAttribute))}}function Vr(o){return o.trim()}function zs(o){const e=o.element;if(!e)return null;const t=e.querySelector("label");if(t&&t.textContent)return Vr(t.textContent);const r=e.textContent;return r?Vr(r):null}class Ls{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,t){if(!e)return;const r=this._localClassNameMap.get(e);r&&(e.classList.remove(r),e.overlayClass=null),t?(e.classList.add(t),e.overlayClass=t,this._localClassNameMap.set(e,t)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const ve=new Ls;class Ms{constructor(e){this.pendingRequests={},this.requestCounter=0,this.globalUiId=this.getGlobalUiId(),this.wrappedConnection=e;const t=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=r=>{r.command==="themeEditorResponse"?this.handleResponse(r.data):t.call(this.wrappedConnection,r)}}sendRequest(e,t){const r=(this.requestCounter++).toString(),n=t.uiId??this.globalUiId;return new Promise((i,s)=>{this.wrappedConnection.send(e,{...t,requestId:r,uiId:n}),this.pendingRequests[r]={resolve:i,reject:s}})}handleResponse(e){const t=this.pendingRequests[e.requestId];if(!t){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code==="ok"?t.resolve(e):t.reject(e)}loadComponentMetadata(e){return this.sendRequest("themeEditorComponentMetadata",{nodeId:e.nodeId})}setLocalClassName(e,t){return this.sendRequest("themeEditorLocalClassName",{nodeId:e.nodeId,className:t})}setCssRules(e){return this.sendRequest("themeEditorRules",{rules:e})}loadRules(e){return this.sendRequest("themeEditorLoadRules",{selectors:e})}markAsUsed(){return this.sendRequest("themeEditorMarkAsUsed",{})}undo(e){return this.sendRequest("themeEditorHistory",{undo:e})}redo(e){return this.sendRequest("themeEditorHistory",{redo:e})}openCss(e){return this.sendRequest("themeEditorOpenCss",{selector:e})}getGlobalUiId(){const e=window.Vaadin;if(e&&e.Flow){const{clients:t}=e.Flow,r=Object.keys(t);for(const n of r){const i=t[n];if(i.getNodeId)return i.getUIId()}}return-1}}const O={index:-1,entries:[]};class Vs{constructor(e){this.api=e}get allowUndo(){return O.index>=0}get allowRedo(){return O.index<O.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,t,r){const n={requestId:e,execute:t,rollback:r};if(O.index++,O.entries=O.entries.slice(0,O.index),O.entries.push(n),t)try{t()}catch(i){console.error("Execute history entry failed",i)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=O.entries[O.index];O.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(t){console.error("Undo failed",t)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;O.index++;const e=O.entries[O.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(t){console.error("Redo failed",t)}return this.allowedActions}static clear(){O.entries=[],O.index=-1}}var Ds=Object.defineProperty,Us=Object.getOwnPropertyDescriptor,pe=(o,e,t,r)=>{for(var n=r>1?void 0:r?Us(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Ds(e,t,n),n};class js extends CustomEvent{constructor(e,t,r){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:t,value:r}})}}class W extends A{constructor(){super(...arguments),this.value=""}static get styles(){return[En,x`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return f`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?f`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new js(this.elementMetadata,this.propertyMetadata,e))}}pe([y({})],W.prototype,"elementMetadata",2);pe([y({})],W.prototype,"propertyMetadata",2);pe([y({})],W.prototype,"theme",2);pe([T()],W.prototype,"propertyValue",2);pe([T()],W.prototype,"value",2);class Tt{constructor(e){if(this._values=[],this._rawValues={},e){const t=e.propertyName,r=e.presets??[];this._values=(r||[]).map(i=>i.startsWith("--")?`var(${i})`:i);const n=document.createElement("div");n.style.borderStyle="solid",n.style.visibility="hidden",document.body.append(n);try{this._values.forEach(i=>{n.style.setProperty(t,i);const s=getComputedStyle(n);this._rawValues[i]=s.getPropertyValue(t).trim()})}finally{n.remove()}}}get values(){return this._values}get rawValues(){return this._rawValues}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const t=e&&e.trim();return this.values.find(r=>this._rawValues[r]===t)}}class Dr extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let Nt=class extends A{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return x`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(o){super.update(o),o.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return f`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${xt.cross}</button>
    `}handleInputChange(o){const e=o.target;this.dispatchEvent(new Dr(e.value))}handleClearClick(){this.dispatchEvent(new Dr(""))}};pe([y({})],Nt.prototype,"value",2);pe([y({})],Nt.prototype,"showClearButton",2);Nt=pe([F("vaadin-dev-tools-theme-text-input")],Nt);var Fs=Object.defineProperty,Bs=Object.getOwnPropertyDescriptor,Vt=(o,e,t,r)=>{for(var n=r>1?void 0:r?Bs(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Fs(e,t,n),n};class Hs extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Qe=class extends A{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[En,x`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(o){super.update(o),o.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return f` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?f`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(o){this.editedClassName=o.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new Hs(this.editedClassName))}};Vt([y({})],Qe.prototype,"className",2);Vt([T()],Qe.prototype,"editedClassName",2);Vt([T()],Qe.prototype,"invalid",2);Qe=Vt([F("vaadin-dev-tools-theme-class-name-editor")],Qe);var Ws=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,Dt=(o,e,t,r)=>{for(var n=r>1?void 0:r?qs(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Ws(e,t,n),n};class Gs extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}Bo(x`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let Ze=class extends A{constructor(){super(...arguments),this.value=D.local}static get styles(){return x`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(o){var e;super.update(o),o.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return f` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(o){var e;const t=((e=this.metadata)==null?void 0:e.displayName)||"Component",r=`${t}s`;Re(f`
        <vaadin-list-box>
          <vaadin-item value=${D.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${t}</span>
          </vaadin-item>
          <vaadin-item value=${D.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${r}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,o)}handleValueChange(o){const e=o.detail.value;e!==this.value&&this.dispatchEvent(new Gs(e))}};Dt([y({})],Ze.prototype,"value",2);Dt([y({})],Ze.prototype,"metadata",2);Dt([rt("vaadin-select")],Ze.prototype,"select",2);Ze=Dt([F("vaadin-dev-tools-theme-scope-selector")],Ze);var Ks=Object.defineProperty,Ys=Object.getOwnPropertyDescriptor,Js=(o,e,t,r)=>{for(var n=r>1?void 0:r?Ys(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Ks(e,t,n),n};let Ur=class extends W{static get styles(){return[W.styles,x`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(o){const e=o.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const o=this.value===this.propertyMetadata.checkedValue;return f` <input type="checkbox" .checked=${o} @change=${this.handleInputChange} /> `}};Ur=Js([F("vaadin-dev-tools-theme-checkbox-property-editor")],Ur);var Xs=Object.defineProperty,Qs=Object.getOwnPropertyDescriptor,Zs=(o,e,t,r)=>{for(var n=r>1?void 0:r?Qs(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Xs(e,t,n),n};let jr=class extends W{handleInputChange(o){this.dispatchChange(o.detail.value)}renderEditor(){var o;return f`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((o=this.propertyValue)==null?void 0:o.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};jr=Zs([F("vaadin-dev-tools-theme-text-property-editor")],jr);var ea=Object.defineProperty,ta=Object.getOwnPropertyDescriptor,Ho=(o,e,t,r)=>{for(var n=r>1?void 0:r?ta(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&ea(e,t,n),n};let Pt=class extends W{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new Tt}static get styles(){return[W.styles,x`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(o){o.has("propertyMetadata")&&(this.presets=new Tt(this.propertyMetadata)),super.update(o)}renderEditor(){var o;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},t=this.presets.values.length;return f`
      <div class=${Fo(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${t}"
          step="1"
          min="0"
          .max=${(t-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((o=this.propertyValue)==null?void 0:o.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(o){const e=o.target,t=parseInt(e.value),r=this.presets.values[t];this.selectedPresetIndex=t,this.value=this.presets.rawValues[r]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(o){this.value=o.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(o){const e=this.presets.tryMapToPreset(o);super.dispatchChange(e)}updateValueFromTheme(){var o;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((o=this.propertyValue)==null?void 0:o.value)||""),this.updateSliderValue()}updateSliderValue(){const o=this.presets.findPreset(this.value);this.selectedPresetIndex=o?this.presets.values.indexOf(o):-1}};Ho([T()],Pt.prototype,"selectedPresetIndex",2);Ho([T()],Pt.prototype,"presets",2);Pt=Ho([F("vaadin-dev-tools-theme-range-property-editor")],Pt);const Ve=(o,e=0,t=1)=>o>t?t:o<e?e:o,M=(o,e=0,t=Math.pow(10,e))=>Math.round(t*o)/t,Cn=({h:o,s:e,v:t,a:r})=>{const n=(200-e)*t/100;return{h:M(o),s:M(n>0&&n<200?e*t/100/(n<=100?n:200-n)*100:0),l:M(n/2),a:M(r,2)}},Io=o=>{const{h:e,s:t,l:r}=Cn(o);return`hsl(${e}, ${t}%, ${r}%)`},xo=o=>{const{h:e,s:t,l:r,a:n}=Cn(o);return`hsla(${e}, ${t}%, ${r}%, ${n})`},oa=({h:o,s:e,v:t,a:r})=>{o=o/360*6,e=e/100,t=t/100;const n=Math.floor(o),i=t*(1-e),s=t*(1-(o-n)*e),l=t*(1-(1-o+n)*e),a=n%6;return{r:M([t,s,i,i,l,t][a]*255),g:M([l,t,t,s,i,i][a]*255),b:M([i,i,l,t,t,s][a]*255),a:M(r,2)}},ra=o=>{const{r:e,g:t,b:r,a:n}=oa(o);return`rgba(${e}, ${t}, ${r}, ${n})`},na=o=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(o);return e?ia({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},ia=({r:o,g:e,b:t,a:r})=>{const n=Math.max(o,e,t),i=n-Math.min(o,e,t),s=i?n===o?(e-t)/i:n===e?2+(t-o)/i:4+(o-e)/i:0;return{h:M(60*(s<0?s+6:s)),s:M(n?i/n*100:0),v:M(n/255*100),a:r}},sa=(o,e)=>{if(o===e)return!0;for(const t in o)if(o[t]!==e[t])return!1;return!0},aa=(o,e)=>o.replace(/\s/g,"")===e.replace(/\s/g,""),Fr={},kn=o=>{let e=Fr[o];return e||(e=document.createElement("template"),e.innerHTML=o,Fr[o]=e),e},Wo=(o,e,t)=>{o.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:t}))};let Oe=!1;const Ro=o=>"touches"in o,la=o=>Oe&&!Ro(o)?!1:(Oe||(Oe=Ro(o)),!0),Br=(o,e)=>{const t=Ro(e)?e.touches[0]:e,r=o.el.getBoundingClientRect();Wo(o.el,"move",o.getMove({x:Ve((t.pageX-(r.left+window.pageXOffset))/r.width),y:Ve((t.pageY-(r.top+window.pageYOffset))/r.height)}))},da=(o,e)=>{const t=e.keyCode;t>40||o.xy&&t<37||t<33||(e.preventDefault(),Wo(o.el,"move",o.getMove({x:t===39?.01:t===37?-.01:t===34?.05:t===33?-.05:t===35?1:t===36?-1:0,y:t===40?.01:t===38?-.01:0},!0)))};class qo{constructor(e,t,r,n){const i=kn(`<div role="slider" tabindex="0" part="${t}" ${r}><div part="${t}-pointer"></div></div>`);e.appendChild(i.content.cloneNode(!0));const s=e.querySelector(`[part=${t}]`);s.addEventListener("mousedown",this),s.addEventListener("touchstart",this),s.addEventListener("keydown",this),this.el=s,this.xy=n,this.nodes=[s.firstChild,s]}set dragging(e){const t=e?document.addEventListener:document.removeEventListener;t(Oe?"touchmove":"mousemove",this),t(Oe?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!la(e)||!Oe&&e.button!=0)return;this.el.focus(),Br(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),Br(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":da(this,e);break}}style(e){e.forEach((t,r)=>{for(const n in t)this.nodes[r].style.setProperty(n,t[n])})}}class ca extends qo{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:Io({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${M(e)}`)}getMove(e,t){return{h:t?Ve(this.h+e.x*360,0,360):360*e.x}}}class ha extends qo{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:Io(e)},{"background-color":Io({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${M(e.s)}%, Brightness ${M(e.v)}%`)}getMove(e,t){return{s:t?Ve(this.hsva.s+e.x*100,0,100):e.x*100,v:t?Ve(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const ua=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',pa="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",ma="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",mt=Symbol("same"),wo=Symbol("color"),Hr=Symbol("hsva"),_o=Symbol("update"),Wr=Symbol("parts"),At=Symbol("css"),It=Symbol("sliders");let ga=class extends HTMLElement{static get observedAttributes(){return["color"]}get[At](){return[ua,pa,ma]}get[It](){return[ha,ca]}get color(){return this[wo]}set color(o){if(!this[mt](o)){const e=this.colorModel.toHsva(o);this[_o](e),this[wo]=o}}constructor(){super();const o=kn(`<style>${this[At].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(o.content.cloneNode(!0)),e.addEventListener("move",this),this[Wr]=this[It].map(t=>new t(e))}connectedCallback(){if(this.hasOwnProperty("color")){const o=this.color;delete this.color,this.color=o}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(o,e,t){const r=this.colorModel.fromAttr(t);this[mt](r)||(this.color=r)}handleEvent(o){const e=this[Hr],t={...e,...o.detail};this[_o](t);let r;!sa(t,e)&&!this[mt](r=this.colorModel.fromHsva(t))&&(this[wo]=r,Wo(this,"color-changed",{value:r}))}[mt](o){return this.color&&this.colorModel.equal(o,this.color)}[_o](o){this[Hr]=o,this[Wr].forEach(e=>e.update(o))}};class fa extends qo{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const t=xo({...e,a:0}),r=xo({...e,a:1}),n=e.a*100;this.style([{left:`${n}%`,color:xo(e)},{"--gradient":`linear-gradient(90deg, ${t}, ${r}`}]);const i=M(n);this.el.setAttribute("aria-valuenow",`${i}`),this.el.setAttribute("aria-valuetext",`${i}%`)}getMove(e,t){return{a:t?Ve(this.hsva.a+e.x):e.x}}}const va=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class ya extends ga{get[At](){return[...super[At],va]}get[It](){return[...super[It],fa]}}const ba={defaultColor:"rgba(0, 0, 0, 1)",toHsva:na,fromHsva:ra,equal:aa,fromAttr:o=>o};class xa extends ya{get colorModel(){return ba}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function wa(o){const e=[];for(;o;){if(o.nodeType===Node.DOCUMENT_NODE){e.push(o);break}if(o.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(o),o=o.host;continue}if(o.assignedSlot){o=o.assignedSlot;continue}o=o.parentNode}return e}const So={start:"top",end:"bottom"},Eo={start:"left",end:"right"},qr=new ResizeObserver(o=>{setTimeout(()=>{o.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),_a=o=>class extends o{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=wa(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,t){if(this.__removeUpdatePositionEventListeners(),t&&(t.__overlay=null,qr.unobserve(t),e&&(this.__addUpdatePositionEventListeners(),t.__overlay=this,qr.observe(t))),e){const r=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(n=>{this.__margins[n]=parseInt(r[n],10)})),this.setAttribute("dir",r.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),t=this.__shouldAlignStartVertically(e);this.style.justifyContent=t?"flex-start":"flex-end";const r=this.__isRTL,n=this.__shouldAlignStartHorizontally(e,r),i=!r&&n||r&&!n;this.style.alignItems=i?"flex-start":"flex-end";const s=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,s,this.noVerticalOverlap,So,this,t),a=this.__calculatePositionInOneDimension(e,s,this.noHorizontalOverlap,Eo,this,n);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!t),this.toggleAttribute("top-aligned",t),this.toggleAttribute("end-aligned",!i),this.toggleAttribute("start-aligned",i)}__shouldAlignStartHorizontally(e,t){const r=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const n=Math.min(window.innerWidth,document.documentElement.clientWidth),i=!t&&this.horizontalAlign==="start"||t&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,r,n,this.__margins,i,this.noHorizontalOverlap,Eo)}__shouldAlignStartVertically(e){const t=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const r=Math.min(window.innerHeight,document.documentElement.clientHeight),n=this.verticalAlign==="top";return this.__shouldAlignStart(e,t,r,this.__margins,n,this.noVerticalOverlap,So)}__shouldAlignStart(e,t,r,n,i,s,l){const a=r-e[s?l.end:l.start]-n[l.end],d=e[s?l.start:l.end]-n[l.start],c=i?a:d,m=c>(i?d:a)||c>t;return i===m}__adjustBottomProperty(e,t,r){let n;if(e===t.end){if(t.end===So.end){const i=Math.min(window.innerHeight,document.documentElement.clientHeight);if(r>i&&this.__oldViewportHeight){const s=this.__oldViewportHeight-i;n=r-s}this.__oldViewportHeight=i}if(t.end===Eo.end){const i=Math.min(window.innerWidth,document.documentElement.clientWidth);if(r>i&&this.__oldViewportWidth){const s=this.__oldViewportWidth-i;n=r-s}this.__oldViewportWidth=i}}return n}__calculatePositionInOneDimension(e,t,r,n,i,s){const l=s?n.start:n.end,a=s?n.end:n.start,d=parseFloat(i.style[l]||getComputedStyle(i)[l]),c=this.__adjustBottomProperty(l,n,d),m=t[s?n.start:n.end]-e[r===s?n.end:n.start],h=c?`${c}px`:`${d+m*(s?-1:1)}px`;return{[l]:h,[a]:""}}};var Sa=Object.defineProperty,Ea=Object.getOwnPropertyDescriptor,Se=(o,e,t,r)=>{for(var n=r>1?void 0:r?Ea(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Sa(e,t,n),n};class Ca extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const $n=x`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let et=class extends A{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[$n,x`
        #toggle {
          display: block;
        }
      `]}update(o){super.update(o),o.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const o=this.value||"rgba(0, 0, 0, 0)";return f` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${o}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const o=this.overlay.shadowRoot.querySelector('[part="overlay"]');o.style.background="#333"}renderOverlayContent(o){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");Re(f` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,o)}handleColorChange(o){this.commitValue=!0,this.dispatchEvent(new Ca(o.detail.value)),o.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const o=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(o))}};Se([y({})],et.prototype,"value",2);Se([y({})],et.prototype,"presets",2);Se([rt("#toggle")],et.prototype,"toggle",2);et=Se([F("vaadin-dev-tools-color-picker")],et);let Rt=class extends A{static get styles(){return[$n,x`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return f` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const o=this.presets.map(e=>f` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return f` <div class="swatches">${o}</div>`}handlePickerChange(o){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:o.detail.value}}))}selectPreset(o){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:o,close:!0}}))}};Se([y({})],Rt.prototype,"value",2);Se([y({})],Rt.prototype,"presets",2);Rt=Se([F("vaadin-dev-tools-color-picker-overlay-content")],Rt);customElements.whenDefined("vaadin-overlay").then(()=>{const o=customElements.get("vaadin-overlay");class e extends _a(o){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",xa);var ka=Object.defineProperty,$a=Object.getOwnPropertyDescriptor,Ta=(o,e,t,r)=>{for(var n=r>1?void 0:r?$a(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&ka(e,t,n),n};let Gr=class extends W{constructor(){super(...arguments),this.presets=new Tt}static get styles(){return[W.styles,x`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(o){o.has("propertyMetadata")&&(this.presets=new Tt(this.propertyMetadata)),super.update(o)}renderEditor(){var o;return f`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((o=this.propertyValue)==null?void 0:o.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(o){this.value=o.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(o){this.value=o.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(o){const e=this.presets.tryMapToPreset(o);super.dispatchChange(e)}updateValueFromTheme(){var o;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((o=this.propertyValue)==null?void 0:o.value)||"")}};Gr=Ta([F("vaadin-dev-tools-theme-color-property-editor")],Gr);var Na=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,Go=(o,e,t,r)=>{for(var n=r>1?void 0:r?Pa(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Na(e,t,n),n};class Aa extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Ot=class extends A{static get styles(){return x`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const o=this.metadata.elements.map(e=>this.renderSection(e));return f` <div>${o}</div> `}renderSection(o){const e=o.properties.map(t=>this.renderPropertyEditor(o,t));return f`
      <div class="section" data-testid=${o==null?void 0:o.displayName}>
        <div class="header">
          <span> ${o.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(o)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(o){this.dispatchEvent(new Aa(o))}renderPropertyEditor(o,e){let t;switch(e.editorType){case P.checkbox:t=ut`vaadin-dev-tools-theme-checkbox-property-editor`;break;case P.range:t=ut`vaadin-dev-tools-theme-range-property-editor`;break;case P.color:t=ut`vaadin-dev-tools-theme-color-property-editor`;break;default:t=ut`vaadin-dev-tools-theme-text-property-editor`}return vs` <${t}
          class="property-editor"
          .elementMetadata=${o}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${t}>`}};Go([y({})],Ot.prototype,"metadata",2);Go([y({})],Ot.prototype,"theme",2);Ot=Go([F("vaadin-dev-tools-theme-property-list")],Ot);var Ia=Object.defineProperty,Ra=Object.getOwnPropertyDescriptor,Oa=(o,e,t,r)=>{for(var n=r>1?void 0:r?Ra(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Ia(e,t,n),n};let zt=class extends A{render(){return f`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(o){const e=this.getTargetElement(o);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(o){const e=this.getTargetElement(o);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(o){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:o}}))}getTargetElement(o){this.style.display="none";const e=document.elementFromPoint(o.clientX,o.clientY);return this.style.display="",e}};zt.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0};zt.styles=[x`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];zt=Oa([F("vaadin-dev-tools-shim")],zt);const Tn=x`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`;var za=Object.defineProperty,La=Object.getOwnPropertyDescriptor,nt=(o,e,t,r)=>{for(var n=r>1?void 0:r?La(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&za(e,t,n),n};let ue=class extends A{constructor(){super(...arguments),this.active=!1,this.components=[],this.selected=0}connectedCallback(){super.connectedCallback();const o=new CSSStyleSheet;o.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,o],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay")}render(){var o;return this.active?(this.style.display="block",f`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(o=this.options)==null?void 0:o.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,t)=>f`<div class=${t===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(o){this.options=o,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(o){var e;if(super.update(o),(o.has("selected")||o.has("components"))&&this.highlight((e=this.components[this.selected])==null?void 0:e.element),o.has("active")){const t=o.get("active"),r=this.active;!t&&r?requestAnimationFrame(()=>this.shim.focus()):t&&!r&&this.highlight(void 0)}}shimKeydown(o){const e=o.detail.originalEvent;if(e.key==="Escape")this.close(),o.stopPropagation(),o.preventDefault();else if(e.key==="ArrowUp"){let t=this.selected-1;t<0&&(t=this.components.length-1),this.selected=t}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),o.stopPropagation(),o.preventDefault())}shimMove(o){const e=o.detail.target;this.components=xs(e),this.selected=this.components.length-1}shimClick(o){this.pickSelectedComponent()}pickSelectedComponent(){const o=this.components[this.selected];if(o&&this.options)try{this.options.pickCallback(o)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(o){if(this.highlighted!==o)if(o){const e=o.getBoundingClientRect(),t=getComputedStyle(o);this.overlayElement.style.top=`${e.top}px`,this.overlayElement.style.left=`${e.left}px`,this.overlayElement.style.width=`${e.width}px`,this.overlayElement.style.height=`${e.height}px`,this.overlayElement.style.borderRadius=t.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=o}};ue.styles=[Tn,x`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];nt([T()],ue.prototype,"active",2);nt([T()],ue.prototype,"components",2);nt([T()],ue.prototype,"selected",2);nt([rt("vaadin-dev-tools-shim")],ue.prototype,"shim",2);ue=nt([F("vaadin-dev-tools-component-picker")],ue);const Ma=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return ue}},Symbol.toStringTag,{value:"Module"}));var Va=Object.defineProperty,Da=Object.getOwnPropertyDescriptor,me=(o,e,t,r)=>{for(var n=r>1?void 0:r?Da(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Va(e,t,n),n};Bo(x`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let ie=class extends A{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Xe.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null}static get styles(){return x`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Ms(this.connection),this.history=new Vs(this.api),this.historyActions=this.history.allowedActions,this.api.markAsUsed(),document.addEventListener("vaadin-theme-updated",()=>{ve.clear(),this.refreshTheme()})}update(o){var e,t;super.update(o),o.has("expanded")&&(this.expanded?this.highlightElement((e=this.context)==null?void 0:e.component.element):this.removeElementHighlight((t=this.context)==null?void 0:t.component.element))}disconnectedCallback(){var o;super.disconnectedCallback(),this.removeElementHighlight((o=this.context)==null?void 0:o.component.element)}render(){var o,e,t;return this.themeEditorState===Xe.missing_theme?this.renderMissingThemeNotice():f`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(o=this.context)!=null&&o.metadata?f` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${xt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((t=this.historyActions)!=null&&t.allowRedo)}
              @click=${this.handleRedo}
            >
              ${xt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return f`
      <div class="notice">
        It looks like you have not set up a custom theme yet. Theme editor requires an existing theme to work with.
        Please check our
        <a href="https://vaadin.com/docs/latest/styling/custom-theme/creating-custom-theme" target="_blank"
          >documentation</a
        >
        on how to set up a custom theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const o=this.context.component.element.localName;return f`
        <div class="notice">Styling <code>&lt;${o}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===D.local&&!this.context.accessible){const o=this.context.metadata.displayName;return f`
        <div class="notice">
          The selected ${o} can not be styled locally. Currently, theme editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${o}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return f` <vaadin-dev-tools-theme-property-list
      class="property-list"
      .metadata=${this.context.metadata}
      .theme=${this.effectiveTheme}
      @theme-property-value-change=${this.handlePropertyChange}
      @open-css=${this.handleOpenCss}
    ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const o=this.context.component,e={nodeId:o.nodeId,uiId:o.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(o){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},t=Me(o.detail.element,e);await this.api.openCss(t)}renderPicker(){var o;let e;if((o=this.context)!=null&&o.metadata){const t=this.context.scope===D.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,r=f`<span class="component-type">${t}</span>`,n=this.context.scope===D.local?zs(this.context.component):null,i=n?f` <span class="instance-name-quote">"</span><span class="instance-name">${n}</span
            ><span class="instance-name-quote">"</span>`:null;e=f`${r} ${i}`}else e=f`<span class="no-selection">Pick an element to get started</span>`;return f`
      <div class="picker">
        <button @click=${this.pickComponent}>${xt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var o;const e=((o=this.context)==null?void 0:o.scope)===D.local&&this.context.accessible;if(!this.context||!e)return null;const t=this.context.localClassName||this.context.suggestedClassName;return f` <vaadin-dev-tools-theme-class-name-editor
      .className=${t}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(o){if(!this.context)return;const e=this.context.localClassName,t=o.detail.value;if(e){const r=this.context.component.element;this.context.localClassName=t;const n=await this.api.setLocalClassName(this.context.component,t);this.historyActions=this.history.push(n.requestId,()=>ve.previewLocalClassName(r,t),()=>ve.previewLocalClassName(r,e))}else this.context={...this.context,suggestedClassName:t}}async pickComponent(){var o;this.removeElementHighlight((o=this.context)==null?void 0:o.component.element),this.pickerProvider().open({infoTemplate:f`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var t;const r=await As.getMetadata(e);if(!r){this.context={component:e,scope:((t=this.context)==null?void 0:t.scope)||D.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}this.highlightElement(e.element),this.refreshComponentAndTheme(e,r)}})}handleScopeChange(o){this.context&&this.refreshTheme({...this.context,scope:o.detail.value})}async handlePropertyChange(o){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:t,value:r}=o.detail;this.editedTheme.updatePropertyValue(e.selector,t.propertyName,r,!0),this.effectiveTheme=he.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const n={themeScope:this.context.scope,localClassName:this.context.localClassName},i=Is(e,n,t.propertyName,r);try{const s=await this.api.setCssRules([i]);this.historyActions=this.history.push(s.requestId);const l=Rs(i);ve.add(l)}catch(s){console.error("Failed to update property value",s)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===D.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const o=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const t=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(t.requestId,()=>ve.previewLocalClassName(o,e),()=>ve.previewLocalClassName(o))}async refreshComponentAndTheme(o,e){var t,r,n;if(o=o||((t=this.context)==null?void 0:t.component),e=e||((r=this.context)==null?void 0:r.metadata),!o||!e)return;const i=await this.api.loadComponentMetadata(o);ve.previewLocalClassName(o.element,i.className),await this.refreshTheme({scope:((n=this.context)==null?void 0:n.scope)||D.local,metadata:e,component:o,localClassName:i.className,suggestedClassName:i.suggestedClassName,accessible:i.accessible})}async refreshTheme(o){const e=o||this.context;if(!e||!e.metadata)return;if(e.scope===D.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let t=new he(e.metadata);if(!(e.scope===D.local&&!e.localClassName)){const n={themeScope:e.scope,localClassName:e.localClassName},i=e.metadata.elements.map(l=>Me(l,n)),s=await this.api.loadRules(i);t=he.fromServerRules(e.metadata,n,s.rules)}const r=await Os(e.metadata);this.context=e,this.baseTheme=r,this.editedTheme=t,this.effectiveTheme=he.combine(r,this.editedTheme)}highlightElement(o){o&&o.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(o){o&&o.classList.remove("vaadin-theme-editor-highlight")}};me([y({})],ie.prototype,"expanded",2);me([y({})],ie.prototype,"themeEditorState",2);me([y({})],ie.prototype,"pickerProvider",2);me([y({})],ie.prototype,"connection",2);me([T()],ie.prototype,"historyActions",2);me([T()],ie.prototype,"context",2);me([T()],ie.prototype,"effectiveTheme",2);ie=me([F("vaadin-dev-tools-theme-editor")],ie);var Ua=function(){var o=document.getSelection();if(!o.rangeCount)return function(){};for(var e=document.activeElement,t=[],r=0;r<o.rangeCount;r++)t.push(o.getRangeAt(r));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return o.removeAllRanges(),function(){o.type==="Caret"&&o.removeAllRanges(),o.rangeCount||t.forEach(function(n){o.addRange(n)}),e&&e.focus()}},Kr={"text/plain":"Text","text/html":"Url",default:"Text"},ja="Copy to clipboard: #{key}, Enter";function Fa(o){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return o.replace(/#{\s*key\s*}/g,e)}function Ba(o,e){var t,r,n,i,s,l,a=!1;e||(e={}),t=e.debug||!1;try{n=Ua(),i=document.createRange(),s=document.getSelection(),l=document.createElement("span"),l.textContent=o,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),e.format)if(c.preventDefault(),typeof c.clipboardData>"u"){t&&console.warn("unable to use e.clipboardData"),t&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Kr[e.format]||Kr.default;window.clipboardData.setData(m,o)}else c.clipboardData.clearData(),c.clipboardData.setData(e.format,o);e.onCopy&&(c.preventDefault(),e.onCopy(c.clipboardData))}),document.body.appendChild(l),i.selectNodeContents(l),s.addRange(i);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(c){t&&console.error("unable to copy using execCommand: ",c),t&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",o),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(m){t&&console.error("unable to copy using clipboardData: ",m),t&&console.error("falling back to prompt"),r=Fa("message"in e?e.message:ja),window.prompt(r,o)}}finally{s&&(typeof s.removeRange=="function"?s.removeRange(i):s.removeAllRanges()),l&&document.body.removeChild(l),n()}return a}const Ko=1e3,Yo=(o,e)=>{const t=Array.from(o.querySelectorAll(e.join(", "))),r=Array.from(o.querySelectorAll("*")).filter(n=>n.shadowRoot).flatMap(n=>Yo(n.shadowRoot,e));return[...t,...r]};let Yr=!1;const tt=(o,e)=>{Yr||(window.addEventListener("message",n=>{n.data==="validate-license"&&window.location.reload()},!1),Yr=!0);const t=o._overlayElement;if(t){if(t.shadowRoot){const n=t.shadowRoot.querySelector("slot:not([name])");if(n&&n.assignedElements().length>0){tt(n.assignedElements()[0],e);return}}tt(t,e);return}const r=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");o.isConnected&&(o.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${r}</div></no-license>`)},We={},Jr={},De={},Nn={},Q=o=>`${o.name}_${o.version}`,Xr=o=>{const{cvdlName:e,version:t}=o.constructor,r={name:e,version:t},n=o.tagName.toLowerCase();We[e]=We[e]??[],We[e].push(n);const i=De[Q(r)];i&&setTimeout(()=>tt(o,i),Ko),De[Q(r)]||Nn[Q(r)]||Jr[Q(r)]||(Jr[Q(r)]=!0,window.Vaadin.devTools.checkLicense(r))},Ha=o=>{Nn[Q(o)]=!0,console.debug("License check ok for",o)},Pn=o=>{const e=o.product.name;De[Q(o.product)]=o,console.error("License check failed for",e);const t=We[e];(t==null?void 0:t.length)>0&&Yo(document,t).forEach(r=>{setTimeout(()=>tt(r,De[Q(o.product)]),Ko)})},Wa=o=>{const e=o.message,t=o.product.name;o.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,De[Q(o.product)]=o,console.error("No license found when checking",t);const r=We[t];(r==null?void 0:r.length)>0&&Yo(document,r).forEach(n=>{setTimeout(()=>tt(n,De[Q(o.product)]),Ko)})},qa=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(o=>{Xr(o)}),window.Vaadin.devTools.createdCvdlElements={push:o=>{Xr(o)}}};var L=(o=>(o.ACTIVE="active",o.INACTIVE="inactive",o.UNAVAILABLE="unavailable",o.ERROR="error",o))(L||{});const An=class In extends Object{constructor(e){super(),this.status="unavailable",e&&(this.webSocket=new WebSocket(e),this.webSocket.onmessage=t=>this.handleMessage(t),this.webSocket.onerror=t=>this.handleError(t),this.webSocket.onclose=t=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},In.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onUpdate(e,t){}onConnectionError(e){}onStatusChange(e){}onMessage(e){console.error("Unknown message received from the live reload server:",e)}handleMessage(e){let t;try{t=JSON.parse(e.data)}catch(r){this.handleError(`[${r.name}: ${r.message}`);return}t.command==="hello"?(this.setStatus("active"),this.onHandshake()):t.command==="reload"?this.status==="active"&&this.onReload():t.command==="update"?this.status==="active"&&this.onUpdate(t.path,t.content):t.command==="license-check-ok"?Ha(t.data):t.command==="license-check-failed"?Pn(t.data):t.command==="license-check-nokey"?Wa(t.data):this.onMessage(t)}handleError(e){console.error(e),this.setStatus("error"),e instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(e)}setActive(e){!e&&this.status==="active"?this.setStatus("inactive"):e&&this.status==="inactive"&&this.setStatus("active")}setStatus(e){this.status!==e&&(this.status=e,this.onStatusChange(e))}send(e,t){const r=JSON.stringify({command:e,data:t});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(r)):this.webSocket.send(r):console.error(`Unable to send message ${e}. No websocket is available`)}setFeature(e,t){this.send("setFeature",{featureId:e,enabled:t})}sendTelemetry(e){this.send("reportTelemetry",{browserData:e})}sendLicenseCheck(e){this.send("checkLicense",e)}sendShowComponentCreateLocation(e){this.send("showComponentCreateLocation",e)}sendShowComponentAttachLocation(e){this.send("showComponentAttachLocation",e)}};An.HEARTBEAT_INTERVAL=18e4;let Co=An;var Ga=Object.defineProperty,Ka=Object.getOwnPropertyDescriptor,N=(o,e,t,r)=>{for(var n=r>1?void 0:r?Ka(e,t):e,i=o.length-1,s;i>=0;i--)(s=o[i])&&(n=(r?s(e,t,n):s(n))||n);return r&&n&&Ga(e,t,n),n};const w=class C extends A{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=L.UNAVAILABLE,this.javaStatus=L.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:()=>this.renderLog(),activate:this.activateLog},{id:"info",title:"Info",render:()=>this.renderInfo()},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Xe.disabled,this.nextMessageId=1,this.transitionDuration=0,this.disableLiveReloadTimeout=null,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}static get styles(){return[x`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          color-scheme: dark;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: auto;
          margin: 0.5rem;
          min-width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,Tn]}static get isActive(){const e=window.sessionStorage.getItem(C.ACTIVE_KEY_IN_SESSION_STORAGE);return e===null||e!=="false"}static notificationDismissed(e){const t=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return t!==null&&t.includes(e)}elementTelemetry(){let e={};try{const t=localStorage.getItem("vaadin.statistics.basket");if(!t)return;e=JSON.parse(t)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(e)}openWebSocketConnection(){this.frontendStatus=L.UNAVAILABLE,this.javaStatus=L.UNAVAILABLE;const e=a=>this.log("error",a),t=()=>{this.showSplashMessage("Reloading…");const a=window.sessionStorage.getItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),d=a?parseInt(a,10)+1:1;window.sessionStorage.setItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,d.toString()),window.sessionStorage.setItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},r=(a,d)=>{let c=document.head.querySelector(`style[data-file-path='${a}']`);c?(this.log("information","Hot update of "+a),c.textContent=d,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):t()},n=new Co(this.getDedicatedWebSocketUrl());n.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),C.isActive||n.setActive(!1),this.elementTelemetry()},n.onConnectionError=e,n.onReload=t,n.onUpdate=r,n.onStatusChange=a=>{this.frontendStatus=a},n.onMessage=a=>this.handleFrontendMessage(a),this.frontendConnection=n;let i;this.backend===C.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(i=new Co(this.getSpringBootWebSocketUrl(window.location)),i.onHandshake=()=>{C.isActive||i.setActive(!1)},i.onReload=t,i.onConnectionError=e):this.backend===C.JREBEL||this.backend===C.HOTSWAP_AGENT?i=n:i=new Co(void 0);const s=i.onStatusChange;i.onStatusChange=a=>{s(a),this.javaStatus=a};const l=i.onHandshake;i.onHandshake=()=>{l(),this.backend&&this.log("information",`Java live reload available: ${C.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=i,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}handleFrontendMessage(e){if((e==null?void 0:e.command)==="serverInfo")this.serverInfo=e.data;else if((e==null?void 0:e.command)==="featureFlags")this.features=e.data.features;else if((e==null?void 0:e.command)==="themeEditorState"){const t=!!window.Vaadin.Flow;this.themeEditorState=e.data,t&&this.themeEditorState!==Xe.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else console.error("Unknown message from front-end connection:",JSON.stringify(e))}getDedicatedWebSocketUrl(){function e(r){const n=document.createElement("div");return n.innerHTML=`<a href="${r}"/>`,n.firstChild.href}if(this.url===void 0)return;const t=e(this.url);if(!t.startsWith("http://")&&!t.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${t.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(e){const{hostname:t}=e,r=e.protocol==="https:"?"wss":"ws";if(t.endsWith("gitpod.io")){const n=t.replace(/.*?-/,"");return`${r}://${this.springBootLiveReloadPort}-${n}`}else return`${r}://${t}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=t=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)){const t=new Date,r=`${`0${t.getHours()}`.slice(-2)}:${`0${t.getMinutes()}`.slice(-2)}:${`0${t.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${r}`),window.sessionStorage.removeItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const e=window;e.Vaadin=e.Vaadin||{},e.Vaadin.devTools=Object.assign(this,e.Vaadin.devTools),qa(),document.documentElement.addEventListener("vaadin-overlay-outside-click",t=>{const r=t,n=r.target.owner;n&&_s(this,n)||r.detail.sourceEvent.composedPath().includes(this)&&t.preventDefault()})}format(e){return e.toString()}catchErrors(){const e=window.Vaadin.ConsoleErrors;e&&e.forEach(t=>{this.log("error",t.map(r=>this.format(r)).join(" "))}),window.Vaadin.ConsoleErrors={push:t=>{this.log("error",t.map(r=>this.format(r)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(e=>this.dismissNotification(e.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(e){this.splashMessage=e,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},C.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(e){this.frontendConnection?this.frontendConnection.sendLicenseCheck(e):Pn({message:"Internal error: no connection",product:e})}log(e,t,r,n){const i=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:i,type:e,message:t,details:r,link:n,dontShowAgain:!1,deleted:!1});this.messages.length>C.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const s=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&s?(setTimeout(()=>s.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):e==="error"&&(this.unreadErrors=!0)})}showNotification(e,t,r,n,i){if(i===void 0||!C.notificationDismissed(i)){if(this.notifications.filter(l=>l.persistentId===i).filter(l=>!l.deleted).length>0)return;const s=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:s,type:e,message:t,details:r,link:n,persistentId:i,dontShowAgain:!1,deleted:!1}),n===void 0&&setTimeout(()=>{this.dismissNotification(s)},C.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(e,t,r,n)}dismissNotification(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const r=this.notifications[t];if(r.dontShowAgain&&r.persistentId&&!C.notificationDismissed(r.persistentId)){let n=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);n=n===null?r.persistentId:`${n},${r.persistentId}`,window.localStorage.setItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,n)}r.deleted=!0,this.log(r.type,r.message,r.details,r.link),setTimeout(()=>{const n=this.findNotificationIndex(e);n!==-1&&(this.notifications.splice(n,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(e){let t=-1;return this.notifications.some((r,n)=>r.id===e?(t=n,!0):!1),t}toggleDontShowAgain(e){const t=this.findNotificationIndex(e);if(t!==-1&&!this.notifications[t].deleted){const r=this.notifications[t];r.dontShowAgain=!r.dontShowAgain,this.requestUpdate()}}setActive(e){var t,r;(t=this.frontendConnection)==null||t.setActive(e),(r=this.javaConnection)==null||r.setActive(e),window.sessionStorage.setItem(C.ACTIVE_KEY_IN_SESSION_STORAGE,e?"true":"false")}getStatusColor(e){return e===L.ACTIVE?"var(--dev-tools-green-color)":e===L.INACTIVE?"var(--dev-tools-grey-color)":e===L.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":e===L.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(e){return f`
      <div
        class="message ${e.type} ${e.deleted?"animate-out":""} ${e.details||e.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${e.message}</div>
          <div class="message-details" ?hidden="${!e.details&&!e.link}">
            ${e.details?f`<p>${e.details}</p>`:""}
            ${e.link?f`<a class="ahreflike" href="${e.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${e.persistentId?f`<div
                class="persist ${e.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(e.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(e.id)}>Dismiss</div>
      </div>
    `}render(){return f` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${e=>e.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(e=>f`<button
                class=${Fo({tab:!0,active:this.activeTab===e.id,unreadErrors:e.id==="log"&&this.unreadErrors})}
                id="${e.id}"
                @click=${()=>{this.activeTab=e.id,e.activate&&e.activate.call(this)}}
              >
                ${e.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(e=>this.activeTab===e.id?e.render():k)}
      </div>

      <div class="notification-tray">${this.notifications.map(e=>this.renderMessage(e))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?f`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:f`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?f`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}renderLog(){return f`<div class="message-tray">${this.messages.map(e=>this.renderMessage(e))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const e=this.renderRoot.querySelector(".message-tray .message:last-child");e&&e.scrollIntoView()})}renderCode(){return f`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await S(()=>Promise.resolve().then(()=>Ma),void 0),this.componentPicker.open({infoTemplate:f`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:e=>{const t={nodeId:e.nodeId,uiId:e.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(t):this.frontendConnection.sendShowComponentAttachLocation(t)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return f`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===L.UNAVAILABLE||this.frontendStatus===L.ERROR)&&(this.javaStatus===L.UNAVAILABLE||this.javaStatus===L.ERROR)}
              ?checked="${this.frontendStatus===L.ACTIVE||this.javaStatus===L.ACTIVE}"
              @change=${e=>this.setActive(e.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${C.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return f`<div class="features-tray">
      ${this.features.map(e=>f`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${e.id}"
              type="checkbox"
              ?checked=${e.enabled}
              @change=${t=>this.toggleFeatureFlag(t,e)}
            />
            <span class="slider"></span>
            ${e.title}
          </label>
          <a class="ahreflike" href="${e.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}renderThemeEditor(){return f` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
    ></vaadin-dev-tools-theme-editor>`}copyInfoToClipboard(){const e=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),t=Array.from(e).map(r=>(r.localName==="dd"?": ":`
`)+r.textContent.trim()).join("").replace(/^\n/,"");Ba(t),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(e,t){const r=e.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(t.id,r),this.showNotification("information",`“${t.title}” ${r?"enabled":"disabled"}`,t.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${t.id}${r?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${t.title}: No server connection available`)}};w.MAX_LOG_ROWS=1e3;w.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";w.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";w.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";w.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";w.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;w.HOTSWAP_AGENT="HOTSWAP_AGENT";w.JREBEL="JREBEL";w.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";w.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};N([y({type:String})],w.prototype,"url",2);N([y({type:Boolean,attribute:!0})],w.prototype,"liveReloadDisabled",2);N([y({type:String})],w.prototype,"backend",2);N([y({type:Number})],w.prototype,"springBootLiveReloadPort",2);N([y({type:Boolean,attribute:!1})],w.prototype,"expanded",2);N([y({type:Array,attribute:!1})],w.prototype,"messages",2);N([y({type:String,attribute:!1})],w.prototype,"splashMessage",2);N([y({type:Array,attribute:!1})],w.prototype,"notifications",2);N([y({type:String,attribute:!1})],w.prototype,"frontendStatus",2);N([y({type:String,attribute:!1})],w.prototype,"javaStatus",2);N([T()],w.prototype,"tabs",2);N([T()],w.prototype,"activeTab",2);N([T()],w.prototype,"serverInfo",2);N([T()],w.prototype,"features",2);N([T()],w.prototype,"unreadErrors",2);N([rt(".window")],w.prototype,"root",2);N([rt("vaadin-dev-tools-component-picker")],w.prototype,"componentPicker",2);N([T()],w.prototype,"componentPickActive",2);N([T()],w.prototype,"themeEditorState",2);let Ya=w;customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",Ya);const{toString:Ja}=Object.prototype;function Xa(o){return Ja.call(o)==="[object RegExp]"}function Qa(o,{preserve:e=!0,whitespace:t=!0,all:r}={}){if(r)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let n=e,i;typeof e=="function"?(n=!1,i=e):Xa(e)&&(n=!1,i=c=>e.test(c));let s=!1,l="",a="",d="";for(let c=0;c<o.length;c++){if(l=o[c],o[c-1]!=="\\"&&(l==='"'||l==="'")&&(s===l?s=!1:s||(s=l)),!s&&l==="/"&&o[c+1]==="*"){const m=o[c+2]==="!";let h=c+2;for(;h<o.length;h++){if(o[h]==="*"&&o[h+1]==="/"){n&&m||i&&i(a)?d+=`/*${a}*/`:t||(o[h+2]===`
`?h++:o[h+2]+o[h+3]===`\r
`&&(h+=2)),a="";break}a+=o[h]}c=h+1;continue}d+=l}return d}const Za=CSSStyleSheet.toString().includes("document.createElement"),el=(o,e)=>{const t=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(o)!=null&&(o=Qa(o));for(var r,n=o;(r=t.exec(o))!==null;){n=n.replace(r[0],"");const i=document.createElement("link");i.rel="stylesheet",i.href=r[2]||r[4];const s=r[1]||r[5];s&&(i.media=s),e===document?document.head.appendChild(i):e.appendChild(i)}return n},tl=(o,e,t)=>(t?e.adoptedStyleSheets=[o,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,o],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(r=>r!==o)}),ol=(o,e,t)=>{const r=new CSSStyleSheet;return r.replaceSync(o),Za?tl(r,e,t):(t?e.adoptedStyleSheets.splice(0,0,r):e.adoptedStyleSheets.push(r),()=>{e.adoptedStyleSheets.splice(e.adoptedStyleSheets.indexOf(r),1)})},rl=(o,e)=>{const t=document.createElement("style");t.type="text/css",t.textContent=o;let r;if(e){const i=Array.from(document.head.childNodes).filter(s=>s.nodeType===Node.COMMENT_NODE).find(s=>s.data.trim()===e);i&&(r=i)}return document.head.insertBefore(t,r),()=>{t.remove()}},Z=(o,e,t,r)=>{if(t===document){const i=nl(o);if(window.Vaadin.theme.injectedGlobalCss.indexOf(i)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(i)}const n=el(o,t);return t===document?rl(n,e):ol(n,t,r)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Qr(o){let e,t,r=2166136261;for(e=0,t=o.length;e<t;e++)r^=o.charCodeAt(e),r+=(r<<1)+(r<<4)+(r<<7)+(r<<8)+(r<<24);return("0000000"+(r>>>0).toString(16)).substr(-8)}function nl(o){let e=Qr(o);return e+Qr(e+o)}document._vaadintheme_themestarter_componentCss||(document._vaadintheme_themestarter_componentCss=!0);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class il extends HTMLElement{static get version(){return"24.1.9"}}customElements.define("vaadin-lumo-styles",il);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const sl=o=>class extends o{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(t,r,n){super.attributeChangedCallback(t,r,n),t==="theme"&&this._set_theme(n)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Rn=[];function On(o){return o&&Object.prototype.hasOwnProperty.call(o,"__themes")}function al(o){return On(customElements.get(o))}function ll(o=[]){return[o].flat(1/0).filter(e=>e instanceof Vo?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ut(o,e,t={}){o&&al(o)&&console.warn(`The custom element definition for "${o}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=ll(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(o,e,t):Rn.push({themeFor:o,styles:e,include:t.include,moduleId:t.moduleId})}function Oo(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():Rn}function dl(o,e){return(o||"").split(" ").some(t=>new RegExp(`^${t.split("*").join(".*")}$`,"u").test(e))}function cl(o=""){let e=0;return o.startsWith("lumo-")||o.startsWith("material-")?e=1:o.startsWith("vaadin-")&&(e=2),e}function zn(o){const e=[];return o.include&&[].concat(o.include).forEach(t=>{const r=Oo().find(n=>n.moduleId===t);r?e.push(...zn(r),...r.styles):console.warn(`Included moduleId ${t} not found in style registry`)},o.styles),e}function hl(o,e){const t=document.createElement("style");t.innerHTML=o.map(r=>r.cssText).join(`
`),e.content.appendChild(t)}function ul(o){const e=`${o}-default-theme`,t=Oo().filter(r=>r.moduleId!==e&&dl(r.themeFor,o)).map(r=>({...r,styles:[...zn(r),...r.styles],includePriority:cl(r.moduleId)})).sort((r,n)=>n.includePriority-r.includePriority);return t.length>0?t:Oo().filter(r=>r.moduleId===e)}const Il=o=>class extends sl(o){static finalize(){if(super.finalize(),this.elementStyles)return;const t=this.prototype._template;!t||On(this)||hl(this.getStylesForThis(),t)}static finalizeStyles(t){const r=this.getStylesForThis();return t?[...super.finalizeStyles(t),...r]:r}static getStylesForThis(){const t=Object.getPrototypeOf(this.prototype),r=(t?t.constructor.__themes:[])||[];this.__themes=[...r,...ul(this.is)];const n=this.__themes.flatMap(i=>i.styles);return n.filter((i,s)=>s===n.lastIndexOf(i))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pl=(o,...e)=>{const t=document.createElement("style");t.id=o,t.textContent=e.map(r=>r.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",t)},ge=(o,...e)=>{pl(`lumo-${o}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ml=x`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,jt=x`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ut("",jt,{moduleId:"lumo-typography"});ge("typography-props",ml);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const gl=x`
  ${un(jt.cssText.replace(/,\s*:host/su,""))}
`;ge("typography",gl,!1);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const fl=x`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;ge("color-props",fl);const Ft=x`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ut("",Ft,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("color",Ft);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Jo=x`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;ge("spacing-props",Jo);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const vl=x`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;x`
  html {
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
  }
`;ge("style-props",vl);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Bt=x`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='warning'] {
    color: var(--lumo-warning-text-color);
    background-color: var(--lumo-warning-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning'][theme~='primary'] {
    color: var(--lumo-warning-contrast-color);
    background-color: var(--lumo-warning-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning']:not([icon]):empty {
    background-color: var(--lumo-warning-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;Ut("",Bt,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("badge",Bt);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const yl=x`
  /* === Screen readers === */
  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const bl=x`
  /* === Background color === */
  .bg-base {
    background-color: var(--lumo-base-color);
  }

  .bg-transparent {
    background-color: transparent;
  }

  .bg-contrast-5 {
    background-color: var(--lumo-contrast-5pct);
  }
  .bg-contrast-10 {
    background-color: var(--lumo-contrast-10pct);
  }
  .bg-contrast-20 {
    background-color: var(--lumo-contrast-20pct);
  }
  .bg-contrast-30 {
    background-color: var(--lumo-contrast-30pct);
  }
  .bg-contrast-40 {
    background-color: var(--lumo-contrast-40pct);
  }
  .bg-contrast-50 {
    background-color: var(--lumo-contrast-50pct);
  }
  .bg-contrast-60 {
    background-color: var(--lumo-contrast-60pct);
  }
  .bg-contrast-70 {
    background-color: var(--lumo-contrast-70pct);
  }
  .bg-contrast-80 {
    background-color: var(--lumo-contrast-80pct);
  }
  .bg-contrast-90 {
    background-color: var(--lumo-contrast-90pct);
  }
  .bg-contrast {
    background-color: var(--lumo-contrast);
  }

  .bg-primary {
    background-color: var(--lumo-primary-color);
  }
  .bg-primary-50 {
    background-color: var(--lumo-primary-color-50pct);
  }
  .bg-primary-10 {
    background-color: var(--lumo-primary-color-10pct);
  }

  .bg-error {
    background-color: var(--lumo-error-color);
  }
  .bg-error-50 {
    background-color: var(--lumo-error-color-50pct);
  }
  .bg-error-10 {
    background-color: var(--lumo-error-color-10pct);
  }

  .bg-success {
    background-color: var(--lumo-success-color);
  }
  .bg-success-50 {
    background-color: var(--lumo-success-color-50pct);
  }
  .bg-success-10 {
    background-color: var(--lumo-success-color-10pct);
  }

  .bg-warning {
    background-color: var(--lumo-warning-color);
  }
  .bg-warning-10 {
    background-color: var(--lumo-warning-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const xl=x`
  /* === Border === */
  .border-0 {
    border: none;
  }
  .border {
    border: 1px solid;
  }
  .border-b {
    border-bottom: 1px solid;
  }
  .border-l {
    border-left: 1px solid;
  }
  .border-r {
    border-right: 1px solid;
  }
  .border-t {
    border-top: 1px solid;
  }

  /* === Border color === */
  .border-contrast-5 {
    border-color: var(--lumo-contrast-5pct);
  }
  .border-contrast-10 {
    border-color: var(--lumo-contrast-10pct);
  }
  .border-contrast-20 {
    border-color: var(--lumo-contrast-20pct);
  }
  .border-contrast-30 {
    border-color: var(--lumo-contrast-30pct);
  }
  .border-contrast-40 {
    border-color: var(--lumo-contrast-40pct);
  }
  .border-contrast-50 {
    border-color: var(--lumo-contrast-50pct);
  }
  .border-contrast-60 {
    border-color: var(--lumo-contrast-60pct);
  }
  .border-contrast-70 {
    border-color: var(--lumo-contrast-70pct);
  }
  .border-contrast-80 {
    border-color: var(--lumo-contrast-80pct);
  }
  .border-contrast-90 {
    border-color: var(--lumo-contrast-90pct);
  }
  .border-contrast {
    border-color: var(--lumo-contrast);
  }

  .border-primary {
    border-color: var(--lumo-primary-color);
  }
  .border-primary-50 {
    border-color: var(--lumo-primary-color-50pct);
  }
  .border-primary-10 {
    border-color: var(--lumo-primary-color-10pct);
  }

  .border-error {
    border-color: var(--lumo-error-color);
  }
  .border-error-50 {
    border-color: var(--lumo-error-color-50pct);
  }
  .border-error-10 {
    border-color: var(--lumo-error-color-10pct);
  }

  .border-success {
    border-color: var(--lumo-success-color);
  }
  .border-success-50 {
    border-color: var(--lumo-success-color-50pct);
  }
  .border-success-10 {
    border-color: var(--lumo-success-color-10pct);
  }

  .border-warning {
    border-color: var(--lumo-warning-color);
  }
  .border-warning-10 {
    border-color: var(--lumo-warning-color-10pct);
  }
  .border-warning-strong {
    border-color: var(--lumo-warning-text-color);
  }

  /* === Border radius === */
  .rounded-none {
    border-radius: 0;
  }
  .rounded-s {
    border-radius: var(--lumo-border-radius-s);
  }
  .rounded-m {
    border-radius: var(--lumo-border-radius-m);
  }
  .rounded-l {
    border-radius: var(--lumo-border-radius-l);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const wl=x`
  /* === Align content === */
  .content-center {
    align-content: center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-around {
    align-content: space-around;
  }
  .content-between {
    align-content: space-between;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-stretch {
    align-content: stretch;
  }

  /* === Align items === */
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }

  /* === Align self === */
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }

  /* === Flex === */
  .flex-auto {
    flex: auto;
  }
  .flex-none {
    flex: none;
  }

  /* === Flex direction === */
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  /* === Flex grow === */
  .flex-grow-0 {
    flex-grow: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }

  /* === Flex shrink === */
  .flex-shrink-0 {
    flex-shrink: 0;
  }
  .flex-shrink {
    flex-shrink: 1;
  }

  /* === Flex wrap === */
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* === Gap === */
  .gap-xs {
    gap: var(--lumo-space-xs);
  }
  .gap-s {
    gap: var(--lumo-space-s);
  }
  .gap-m {
    gap: var(--lumo-space-m);
  }
  .gap-l {
    gap: var(--lumo-space-l);
  }
  .gap-xl {
    gap: var(--lumo-space-xl);
  }

  /* === Gap (column) === */
  .gap-x-xs {
    column-gap: var(--lumo-space-xs);
  }
  .gap-x-s {
    column-gap: var(--lumo-space-s);
  }
  .gap-x-m {
    column-gap: var(--lumo-space-m);
  }
  .gap-x-l {
    column-gap: var(--lumo-space-l);
  }
  .gap-x-xl {
    column-gap: var(--lumo-space-xl);
  }

  /* === Gap (row) === */
  .gap-y-xs {
    row-gap: var(--lumo-space-xs);
  }
  .gap-y-s {
    row-gap: var(--lumo-space-s);
  }
  .gap-y-m {
    row-gap: var(--lumo-space-m);
  }
  .gap-y-l {
    row-gap: var(--lumo-space-l);
  }
  .gap-y-xl {
    row-gap: var(--lumo-space-xl);
  }

  /* === Grid auto flow === */
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }

  /* === Grid columns === */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  /* === Grid rows === */
  .grid-rows-1 {
    grid-template-rows: repeat(1, minmax(0, 1fr));
  }
  .grid-rows-2 {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-3 {
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .grid-rows-5 {
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  .grid-rows-6 {
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }

  /* === Justify content === */
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }

  /* === Span (column) === */
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-6 {
    grid-column: span 6 / span 6;
  }
  .col-span-7 {
    grid-column: span 7 / span 7;
  }
  .col-span-8 {
    grid-column: span 8 / span 8;
  }
  .col-span-9 {
    grid-column: span 9 / span 9;
  }
  .col-span-10 {
    grid-column: span 10 / span 10;
  }
  .col-span-11 {
    grid-column: span 11 / span 11;
  }
  .col-span-12 {
    grid-column: span 12 / span 12;
  }

  /* === Span (row) === */
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-span-5 {
    grid-row: span 5 / span 5;
  }
  .row-span-6 {
    grid-row: span 6 / span 6;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex-col {
      flex-direction: column;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .sm\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .sm\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .sm\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .sm\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .sm\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .sm\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:flex-col {
      flex-direction: column;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .md\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .md\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .md\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .md\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .md\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .md\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .md\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .md\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex-col {
      flex-direction: column;
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .lg\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .lg\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .lg\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .lg\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .lg\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex-col {
      flex-direction: column;
    }
    .xl\\:flex-row {
      flex-direction: row;
    }
    .xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex-col {
      flex-direction: column;
    }
    .\\32xl\\:flex-row {
      flex-direction: row;
    }
    .\\32xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const _l=x`
  /* === Box sizing === */
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }

  /* === Display === */
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }
  .grid {
    display: grid;
  }

  /* === Overflow === */
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }

  /* === Position === */
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .relative {
    position: relative;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:flex {
      display: flex;
    }
    .sm\\:hidden {
      display: none;
    }
  }
  @media (min-width: 768px) {
    .md\\:flex {
      display: flex;
    }
    .md\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1024px) {
    .lg\\:flex {
      display: flex;
    }
    .lg\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1280px) {
    .xl\\:flex {
      display: flex;
    }
    .xl\\:hidden {
      display: none;
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:flex {
      display: flex;
    }
    .\\32xl\\:hidden {
      display: none;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Sl=x`
  /* === Box shadows === */
  .shadow-xs {
    box-shadow: var(--lumo-box-shadow-xs);
  }
  .shadow-s {
    box-shadow: var(--lumo-box-shadow-s);
  }
  .shadow-m {
    box-shadow: var(--lumo-box-shadow-m);
  }
  .shadow-l {
    box-shadow: var(--lumo-box-shadow-l);
  }
  .shadow-xl {
    box-shadow: var(--lumo-box-shadow-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const El=x`
  /* === Height === */
  .h-0 {
    height: 0;
  }
  .h-xs {
    height: var(--lumo-size-xs);
  }
  .h-s {
    height: var(--lumo-size-s);
  }
  .h-m {
    height: var(--lumo-size-m);
  }
  .h-l {
    height: var(--lumo-size-l);
  }
  .h-xl {
    height: var(--lumo-size-xl);
  }
  .h-auto {
    height: auto;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }

  /* === Height (max) === */
  .max-h-full {
    max-height: 100%;
  }
  .max-h-screen {
    max-height: 100vh;
  }

  /* === Height (min) === */
  .min-h-0 {
    min-height: 0;
  }
  .min-h-full {
    min-height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }

  /* === Icon sizing === */
  .icon-s {
    height: var(--lumo-icon-size-s);
    width: var(--lumo-icon-size-s);
  }
  .icon-m {
    height: var(--lumo-icon-size-m);
    width: var(--lumo-icon-size-m);
  }
  .icon-l {
    height: var(--lumo-icon-size-l);
    width: var(--lumo-icon-size-l);
  }

  /* === Width === */
  .w-xs {
    width: var(--lumo-size-xs);
  }
  .w-s {
    width: var(--lumo-size-s);
  }
  .w-m {
    width: var(--lumo-size-m);
  }
  .w-l {
    width: var(--lumo-size-l);
  }
  .w-xl {
    width: var(--lumo-size-xl);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }

  /* === Width (max) === */
  .max-w-full {
    max-width: 100%;
  }
  .max-w-screen-sm {
    max-width: 640px;
  }
  .max-w-screen-md {
    max-width: 768px;
  }
  .max-w-screen-lg {
    max-width: 1024px;
  }
  .max-w-screen-xl {
    max-width: 1280px;
  }
  .max-w-screen-2xl {
    max-width: 1536px;
  }

  /* === Width (min) === */
  .min-w-0 {
    min-width: 0;
  }
  .min-w-full {
    min-width: 100%;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Cl=x`
  /* === Margin === */
  .m-auto {
    margin: auto;
  }
  .m-0 {
    margin: 0;
  }
  .m-xs {
    margin: var(--lumo-space-xs);
  }
  .m-s {
    margin: var(--lumo-space-s);
  }
  .m-m {
    margin: var(--lumo-space-m);
  }
  .m-l {
    margin: var(--lumo-space-l);
  }
  .m-xl {
    margin: var(--lumo-space-xl);
  }

  /* === Margin (bottom) === */
  .mb-auto {
    margin-bottom: auto;
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-xs {
    margin-bottom: var(--lumo-space-xs);
  }
  .mb-s {
    margin-bottom: var(--lumo-space-s);
  }
  .mb-m {
    margin-bottom: var(--lumo-space-m);
  }
  .mb-l {
    margin-bottom: var(--lumo-space-l);
  }
  .mb-xl {
    margin-bottom: var(--lumo-space-xl);
  }

  /* === Margin (end) === */
  .me-auto {
    margin-inline-end: auto;
  }
  .me-0 {
    margin-inline-end: 0;
  }
  .me-xs {
    margin-inline-end: var(--lumo-space-xs);
  }
  .me-s {
    margin-inline-end: var(--lumo-space-s);
  }
  .me-m {
    margin-inline-end: var(--lumo-space-m);
  }
  .me-l {
    margin-inline-end: var(--lumo-space-l);
  }
  .me-xl {
    margin-inline-end: var(--lumo-space-xl);
  }

  /* === Margin (horizontal) === */
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .mx-0 {
    margin-left: 0;
    margin-right: 0;
  }
  .mx-xs {
    margin-left: var(--lumo-space-xs);
    margin-right: var(--lumo-space-xs);
  }
  .mx-s {
    margin-left: var(--lumo-space-s);
    margin-right: var(--lumo-space-s);
  }
  .mx-m {
    margin-left: var(--lumo-space-m);
    margin-right: var(--lumo-space-m);
  }
  .mx-l {
    margin-left: var(--lumo-space-l);
    margin-right: var(--lumo-space-l);
  }
  .mx-xl {
    margin-left: var(--lumo-space-xl);
    margin-right: var(--lumo-space-xl);
  }

  /* === Margin (left) === */
  .ml-auto {
    margin-left: auto;
  }
  .ml-0 {
    margin-left: 0;
  }
  .ml-xs {
    margin-left: var(--lumo-space-xs);
  }
  .ml-s {
    margin-left: var(--lumo-space-s);
  }
  .ml-m {
    margin-left: var(--lumo-space-m);
  }
  .ml-l {
    margin-left: var(--lumo-space-l);
  }
  .ml-xl {
    margin-left: var(--lumo-space-xl);
  }

  /* === Margin (right) === */
  .mr-auto {
    margin-right: auto;
  }
  .mr-0 {
    margin-right: 0;
  }
  .mr-xs {
    margin-right: var(--lumo-space-xs);
  }
  .mr-s {
    margin-right: var(--lumo-space-s);
  }
  .mr-m {
    margin-right: var(--lumo-space-m);
  }
  .mr-l {
    margin-right: var(--lumo-space-l);
  }
  .mr-xl {
    margin-right: var(--lumo-space-xl);
  }

  /* === Margin (start) === */
  .ms-auto {
    margin-inline-start: auto;
  }
  .ms-0 {
    margin-inline-start: 0;
  }
  .ms-xs {
    margin-inline-start: var(--lumo-space-xs);
  }
  .ms-s {
    margin-inline-start: var(--lumo-space-s);
  }
  .ms-m {
    margin-inline-start: var(--lumo-space-m);
  }
  .ms-l {
    margin-inline-start: var(--lumo-space-l);
  }
  .ms-xl {
    margin-inline-start: var(--lumo-space-xl);
  }

  /* === Margin (top) === */
  .mt-auto {
    margin-top: auto;
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-xs {
    margin-top: var(--lumo-space-xs);
  }
  .mt-s {
    margin-top: var(--lumo-space-s);
  }
  .mt-m {
    margin-top: var(--lumo-space-m);
  }
  .mt-l {
    margin-top: var(--lumo-space-l);
  }
  .mt-xl {
    margin-top: var(--lumo-space-xl);
  }

  /* === Margin (vertical) === */
  .my-auto {
    margin-bottom: auto;
    margin-top: auto;
  }
  .my-0 {
    margin-bottom: 0;
    margin-top: 0;
  }
  .my-xs {
    margin-bottom: var(--lumo-space-xs);
    margin-top: var(--lumo-space-xs);
  }
  .my-s {
    margin-bottom: var(--lumo-space-s);
    margin-top: var(--lumo-space-s);
  }
  .my-m {
    margin-bottom: var(--lumo-space-m);
    margin-top: var(--lumo-space-m);
  }
  .my-l {
    margin-bottom: var(--lumo-space-l);
    margin-top: var(--lumo-space-l);
  }
  .my-xl {
    margin-bottom: var(--lumo-space-xl);
    margin-top: var(--lumo-space-xl);
  }

  /* === Padding === */
  .p-0 {
    padding: 0;
  }
  .p-xs {
    padding: var(--lumo-space-xs);
  }
  .p-s {
    padding: var(--lumo-space-s);
  }
  .p-m {
    padding: var(--lumo-space-m);
  }
  .p-l {
    padding: var(--lumo-space-l);
  }
  .p-xl {
    padding: var(--lumo-space-xl);
  }

  /* === Padding (bottom) === */
  .pb-0 {
    padding-bottom: 0;
  }
  .pb-xs {
    padding-bottom: var(--lumo-space-xs);
  }
  .pb-s {
    padding-bottom: var(--lumo-space-s);
  }
  .pb-m {
    padding-bottom: var(--lumo-space-m);
  }
  .pb-l {
    padding-bottom: var(--lumo-space-l);
  }
  .pb-xl {
    padding-bottom: var(--lumo-space-xl);
  }

  /* === Padding (end) === */
  .pe-0 {
    padding-inline-end: 0;
  }
  .pe-xs {
    padding-inline-end: var(--lumo-space-xs);
  }
  .pe-s {
    padding-inline-end: var(--lumo-space-s);
  }
  .pe-m {
    padding-inline-end: var(--lumo-space-m);
  }
  .pe-l {
    padding-inline-end: var(--lumo-space-l);
  }
  .pe-xl {
    padding-inline-end: var(--lumo-space-xl);
  }

  /* === Padding (horizontal) === */
  .px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .px-xs {
    padding-left: var(--lumo-space-xs);
    padding-right: var(--lumo-space-xs);
  }
  .px-s {
    padding-left: var(--lumo-space-s);
    padding-right: var(--lumo-space-s);
  }
  .px-m {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }
  .px-l {
    padding-left: var(--lumo-space-l);
    padding-right: var(--lumo-space-l);
  }
  .px-xl {
    padding-left: var(--lumo-space-xl);
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (left) === */
  .pl-0 {
    padding-left: 0;
  }
  .pl-xs {
    padding-left: var(--lumo-space-xs);
  }
  .pl-s {
    padding-left: var(--lumo-space-s);
  }
  .pl-m {
    padding-left: var(--lumo-space-m);
  }
  .pl-l {
    padding-left: var(--lumo-space-l);
  }
  .pl-xl {
    padding-left: var(--lumo-space-xl);
  }

  /* === Padding (right) === */
  .pr-0 {
    padding-right: 0;
  }
  .pr-xs {
    padding-right: var(--lumo-space-xs);
  }
  .pr-s {
    padding-right: var(--lumo-space-s);
  }
  .pr-m {
    padding-right: var(--lumo-space-m);
  }
  .pr-l {
    padding-right: var(--lumo-space-l);
  }
  .pr-xl {
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (start) === */
  .ps-0 {
    padding-inline-start: 0;
  }
  .ps-xs {
    padding-inline-start: var(--lumo-space-xs);
  }
  .ps-s {
    padding-inline-start: var(--lumo-space-s);
  }
  .ps-m {
    padding-inline-start: var(--lumo-space-m);
  }
  .ps-l {
    padding-inline-start: var(--lumo-space-l);
  }
  .ps-xl {
    padding-inline-start: var(--lumo-space-xl);
  }

  /* === Padding (top) === */
  .pt-0 {
    padding-top: 0;
  }
  .pt-xs {
    padding-top: var(--lumo-space-xs);
  }
  .pt-s {
    padding-top: var(--lumo-space-s);
  }
  .pt-m {
    padding-top: var(--lumo-space-m);
  }
  .pt-l {
    padding-top: var(--lumo-space-l);
  }
  .pt-xl {
    padding-top: var(--lumo-space-xl);
  }

  /* === Padding (vertical) === */
  .py-0 {
    padding-bottom: 0;
    padding-top: 0;
  }
  .py-xs {
    padding-bottom: var(--lumo-space-xs);
    padding-top: var(--lumo-space-xs);
  }
  .py-s {
    padding-bottom: var(--lumo-space-s);
    padding-top: var(--lumo-space-s);
  }
  .py-m {
    padding-bottom: var(--lumo-space-m);
    padding-top: var(--lumo-space-m);
  }
  .py-l {
    padding-bottom: var(--lumo-space-l);
    padding-top: var(--lumo-space-l);
  }
  .py-xl {
    padding-bottom: var(--lumo-space-xl);
    padding-top: var(--lumo-space-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const kl=x`
  /* === Font size === */
  .text-2xs {
    font-size: var(--lumo-font-size-xxs);
  }
  .text-xs {
    font-size: var(--lumo-font-size-xs);
  }
  .text-s {
    font-size: var(--lumo-font-size-s);
  }
  .text-m {
    font-size: var(--lumo-font-size-m);
  }
  .text-l {
    font-size: var(--lumo-font-size-l);
  }
  .text-xl {
    font-size: var(--lumo-font-size-xl);
  }
  .text-2xl {
    font-size: var(--lumo-font-size-xxl);
  }
  .text-3xl {
    font-size: var(--lumo-font-size-xxxl);
  }

  /* === Font weight === */
  .font-thin {
    font-weight: 100;
  }
  .font-extralight {
    font-weight: 200;
  }
  .font-light {
    font-weight: 300;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-medium {
    font-weight: 500;
  }
  .font-semibold {
    font-weight: 600;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-extrabold {
    font-weight: 800;
  }
  .font-black {
    font-weight: 900;
  }

  /* === Line height === */
  .leading-none {
    line-height: 1;
  }
  .leading-xs {
    line-height: var(--lumo-line-height-xs);
  }
  .leading-s {
    line-height: var(--lumo-line-height-s);
  }
  .leading-m {
    line-height: var(--lumo-line-height-m);
  }

  /* === List style type === */
  .list-none {
    list-style-type: none;
  }

  /* === Text alignment === */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  /* === Text color === */
  .text-header {
    color: var(--lumo-header-text-color);
  }
  .text-body {
    color: var(--lumo-body-text-color);
  }
  .text-secondary {
    color: var(--lumo-secondary-text-color);
  }
  .text-tertiary {
    color: var(--lumo-tertiary-text-color);
  }
  .text-disabled {
    color: var(--lumo-disabled-text-color);
  }
  .text-primary {
    color: var(--lumo-primary-text-color);
  }
  .text-primary-contrast {
    color: var(--lumo-primary-contrast-color);
  }
  .text-error {
    color: var(--lumo-error-text-color);
  }
  .text-error-contrast {
    color: var(--lumo-error-contrast-color);
  }
  .text-success {
    color: var(--lumo-success-text-color);
  }
  .text-success-contrast {
    color: var(--lumo-success-contrast-color);
  }
  .text-warning {
    color: var(--lumo-warning-text-color);
  }
  .text-warning-contrast {
    color: var(--lumo-warning-contrast-color);
  }

  /* === Text overflow === */
  .overflow-clip {
    text-overflow: clip;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }

  /* === Text transform === */
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .uppercase {
    text-transform: uppercase;
  }

  /* === Whitespace === */
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .sm\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .sm\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .sm\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .sm\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .sm\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .sm\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .sm\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 768px) {
    .md\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .md\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .md\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .md\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .md\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .md\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .md\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .md\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1024px) {
    .lg\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .lg\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .lg\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .lg\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .lg\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .lg\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .lg\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .lg\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1280px) {
    .xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .\\32xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .\\32xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .\\32xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .\\32xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .\\32xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .\\32xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .\\32xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ht=x`
${yl}
${bl}
${xl}
${Sl}
${wl}
${_l}
${El}
${Cl}
${kl}
`;Ut("",Ht,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ge("utility",Ht);const $l=o=>{const e=[];o!==document&&(e.push(Z(jt.cssText,"",o,!0)),e.push(Z(Ft.cssText,"",o,!0)),e.push(Z(Jo.cssText,"",o,!0)),e.push(Z(Bt.cssText,"",o,!0)),e.push(Z(Ht.cssText,"",o,!0)))};document._vaadintheme_componentsample_componentCss||(document._vaadintheme_componentsample_componentCss=!0);const Tl=o=>{const e=[];o!==document&&(e.push(Z(jt.cssText,"",o,!0)),e.push(Z(Ft.cssText,"",o,!0)),e.push(Z(Jo.cssText,"",o,!0)),e.push(Z(Bt.cssText,"",o,!0)),e.push(Z(Ht.cssText,"",o,!0))),$l(o)},Nl=Tl;Nl(document);export{ls as D,Be as F,A as L,ss as P,Il as T,Ae as U,E as _,ge as a,we as b,x as c,as as d,Ut as e,sl as f,Ft as g,f as h,jt as i,J as j,Cs as k,ks as l,k as n,Re as r,Pe as s,Rn as t,un as u,P as y};
