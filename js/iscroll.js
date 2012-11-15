/*!
 * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(e,t){function A(e){return i===""?e:(e=e.charAt(0).toUpperCase()+e.substr(1),i+e)}var n=Math,r=t.createElement("div").style,i=function(){var e="t,webkitT,MozT,msT,OT".split(","),t,n=0,i=e.length;for(;n<i;n++){t=e[n]+"ransform";if(t in r)return e[n].substr(0,e[n].length-1)}return!1}(),s=i?"-"+i.toLowerCase()+"-":"",o=A("transform"),u=A("transitionProperty"),a=A("transitionDuration"),f=A("transformOrigin"),l=A("transitionTimingFunction"),c=A("transitionDelay"),h=/android/gi.test(navigator.appVersion),p=/iphone|ipad/gi.test(navigator.appVersion),d=/hp-tablet/gi.test(navigator.appVersion),v=A("perspective")in r,m="ontouchstart"in e&&!d,g=i!==!1,y=A("transition")in r,b="onorientationchange"in e?"orientationchange":"resize",w=m?"touchstart":"mousedown",E=m?"touchmove":"mousemove",S=m?"touchend":"mouseup",x=m?"touchcancel":"mouseup",T=function(){if(i===!1)return!1;var e={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"};return e[i]}(),N=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){return setTimeout(e,1)}}(),C=function(){return e.cancelRequestAnimationFrame||e.webkitCancelAnimationFrame||e.webkitCancelRequestAnimationFrame||e.mozCancelRequestAnimationFrame||e.oCancelRequestAnimationFrame||e.msCancelRequestAnimationFrame||clearTimeout}(),k=v?" translateZ(0)":"",L=function(n,r){var i=this,c;i.wrapper=typeof n=="object"?n:t.getElementById(n),i.wrapper.style.overflow="hidden",i.scroller=i.wrapper.children[0],i.options={hScroll:!0,vScroll:!0,x:0,y:0,bounce:!0,bounceLock:!1,momentum:!0,lockDirection:!0,useTransform:!0,useTransition:!1,topOffset:0,checkDOMChanges:!1,handleClick:!0,hScrollbar:!0,vScrollbar:!0,fixedScrollbar:h,hideScrollbar:p,fadeScrollbar:p&&v,scrollbarClass:"",zoom:!1,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:!1,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(e){e.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(c in r)i.options[c]=r[c];i.x=i.options.x,i.y=i.options.y,i.options.useTransform=g&&i.options.useTransform,i.options.hScrollbar=i.options.hScroll&&i.options.hScrollbar,i.options.vScrollbar=i.options.vScroll&&i.options.vScrollbar,i.options.zoom=i.options.useTransform&&i.options.zoom,i.options.useTransition=y&&i.options.useTransition,i.options.zoom&&h&&(k=""),i.scroller.style[u]=i.options.useTransform?s+"transform":"top left",i.scroller.style[a]="0",i.scroller.style[f]="0 0",i.options.useTransition&&(i.scroller.style[l]="cubic-bezier(0.33,0.66,0.66,1)"),i.options.useTransform?i.scroller.style[o]="translate("+i.x+"px,"+i.y+"px)"+k:i.scroller.style.cssText+=";position:absolute;top:"+i.y+"px;left:"+i.x+"px",i.options.useTransition&&(i.options.fixedScrollbar=!0),i.refresh(),i._bind(b,e),i._bind(w),m||i.options.wheelAction!="none"&&(i._bind("DOMMouseScroll"),i._bind("mousewheel")),i.options.checkDOMChanges&&(i.checkDOMTime=setInterval(function(){i._checkDOMChanges()},500))};L.prototype={enabled:!0,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(e){var t=this;switch(e.type){case w:if(!m&&e.button!==0)return;t._start(e);break;case E:t._move(e);break;case S:case x:t._end(e);break;case b:t._resize();break;case"DOMMouseScroll":case"mousewheel":t._wheel(e);break;case T:t._transitionEnd(e)}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)return;this.refresh()},_scrollbar:function(e){var r=this,i;if(!r[e+"Scrollbar"]){r[e+"ScrollbarWrapper"]&&(g&&(r[e+"ScrollbarIndicator"].style[o]=""),r[e+"ScrollbarWrapper"].parentNode.removeChild(r[e+"ScrollbarWrapper"]),r[e+"ScrollbarWrapper"]=null,r[e+"ScrollbarIndicator"]=null);return}r[e+"ScrollbarWrapper"]||(i=t.createElement("div"),r.options.scrollbarClass?i.className=r.options.scrollbarClass+e.toUpperCase():i.style.cssText="position:absolute;z-index:100;"+(e=="h"?"height:7px;bottom:1px;left:2px;right:"+(r.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(r.hScrollbar?"7":"2")+"px;top:2px;right:1px"),i.style.cssText+=";pointer-events:none;"+s+"transition-property:opacity;"+s+"transition-duration:"+(r.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(r.options.hideScrollbar?"0":"1"),r.wrapper.appendChild(i),r[e+"ScrollbarWrapper"]=i,i=t.createElement("div"),r.options.scrollbarClass||(i.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);"+s+"background-clip:padding-box;"+s+"box-sizing:border-box;"+(e=="h"?"height:100%":"width:100%")+";"+s+"border-radius:3px;border-radius:3px"),i.style.cssText+=";pointer-events:none;"+s+"transition-property:"+s+"transform;"+s+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);"+s+"transition-duration:0;"+s+"transform: translate(0,0)"+k,r.options.useTransition&&(i.style.cssText+=";"+s+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"),r[e+"ScrollbarWrapper"].appendChild(i),r[e+"ScrollbarIndicator"]=i),e=="h"?(r.hScrollbarSize=r.hScrollbarWrapper.clientWidth,r.hScrollbarIndicatorSize=n.max(n.round(r.hScrollbarSize*r.hScrollbarSize/r.scrollerW),8),r.hScrollbarIndicator.style.width=r.hScrollbarIndicatorSize+"px",r.hScrollbarMaxScroll=r.hScrollbarSize-r.hScrollbarIndicatorSize,r.hScrollbarProp=r.hScrollbarMaxScroll/r.maxScrollX):(r.vScrollbarSize=r.vScrollbarWrapper.clientHeight,r.vScrollbarIndicatorSize=n.max(n.round(r.vScrollbarSize*r.vScrollbarSize/r.scrollerH),8),r.vScrollbarIndicator.style.height=r.vScrollbarIndicatorSize+"px",r.vScrollbarMaxScroll=r.vScrollbarSize-r.vScrollbarIndicatorSize,r.vScrollbarProp=r.vScrollbarMaxScroll/r.maxScrollY),r._scrollbarPos(e,!0)},_resize:function(){var e=this;setTimeout(function(){e.refresh()},h?200:0)},_pos:function(e,t){if(this.zoomed)return;e=this.hScroll?e:0,t=this.vScroll?t:0,this.options.useTransform?this.scroller.style[o]="translate("+e+"px,"+t+"px) scale("+this.scale+")"+k:(e=n.round(e),t=n.round(t),this.scroller.style.left=e+"px",this.scroller.style.top=t+"px"),this.x=e,this.y=t,this._scrollbarPos("h"),this._scrollbarPos("v")},_scrollbarPos:function(e,t){var r=this,i=e=="h"?r.x:r.y,s;if(!r[e+"Scrollbar"])return;i=r[e+"ScrollbarProp"]*i,i<0?(r.options.fixedScrollbar||(s=r[e+"ScrollbarIndicatorSize"]+n.round(i*3),s<8&&(s=8),r[e+"ScrollbarIndicator"].style[e=="h"?"width":"height"]=s+"px"),i=0):i>r[e+"ScrollbarMaxScroll"]&&(r.options.fixedScrollbar?i=r[e+"ScrollbarMaxScroll"]:(s=r[e+"ScrollbarIndicatorSize"]-n.round((i-r[e+"ScrollbarMaxScroll"])*3),s<8&&(s=8),r[e+"ScrollbarIndicator"].style[e=="h"?"width":"height"]=s+"px",i=r[e+"ScrollbarMaxScroll"]+(r[e+"ScrollbarIndicatorSize"]-s))),r[e+"ScrollbarWrapper"].style[c]="0",r[e+"ScrollbarWrapper"].style.opacity=t&&r.options.hideScrollbar?"0":"1",r[e+"ScrollbarIndicator"].style[o]="translate("+(e=="h"?i+"px,0)":"0,"+i+"px)")+k},_start:function(t){var r=this,i=m?t.touches[0]:t,s,u,a,f,l;if(!r.enabled)return;r.options.onBeforeScrollStart&&r.options.onBeforeScrollStart.call(r,t),(r.options.useTransition||r.options.zoom)&&r._transitionTime(0),r.moved=!1,r.animating=!1,r.zoomed=!1,r.distX=0,r.distY=0,r.absDistX=0,r.absDistY=0,r.dirX=0,r.dirY=0,r.options.zoom&&m&&t.touches.length>1&&(f=n.abs(t.touches[0].pageX-t.touches[1].pageX),l=n.abs(t.touches[0].pageY-t.touches[1].pageY),r.touchesDistStart=n.sqrt(f*f+l*l),r.originX=n.abs(t.touches[0].pageX+t.touches[1].pageX-r.wrapperOffsetLeft*2)/2-r.x,r.originY=n.abs(t.touches[0].pageY+t.touches[1].pageY-r.wrapperOffsetTop*2)/2-r.y,r.options.onZoomStart&&r.options.onZoomStart.call(r,t));if(r.options.momentum){r.options.useTransform?(s=getComputedStyle(r.scroller,null)[o].replace(/[^0-9\-.,]/g,"").split(","),u=+(s[12]||s[4]),a=+(s[13]||s[5])):(u=+getComputedStyle(r.scroller,null).left.replace(/[^0-9-]/g,""),a=+getComputedStyle(r.scroller,null).top.replace(/[^0-9-]/g,""));if(u!=r.x||a!=r.y)r.options.useTransition?r._unbind(T):C(r.aniTime),r.steps=[],r._pos(u,a),r.options.onScrollEnd&&r.options.onScrollEnd.call(r)}r.absStartX=r.x,r.absStartY=r.y,r.startX=r.x,r.startY=r.y,r.pointX=i.pageX,r.pointY=i.pageY,r.startTime=t.timeStamp||Date.now(),r.options.onScrollStart&&r.options.onScrollStart.call(r,t),r._bind(E,e),r._bind(S,e),r._bind(x,e)},_move:function(e){var t=this,r=m?e.touches[0]:e,i=r.pageX-t.pointX,s=r.pageY-t.pointY,u=t.x+i,a=t.y+s,f,l,c,h=e.timeStamp||Date.now();t.options.onBeforeScrollMove&&t.options.onBeforeScrollMove.call(t,e);if(t.options.zoom&&m&&e.touches.length>1){f=n.abs(e.touches[0].pageX-e.touches[1].pageX),l=n.abs(e.touches[0].pageY-e.touches[1].pageY),t.touchesDist=n.sqrt(f*f+l*l),t.zoomed=!0,c=1/t.touchesDistStart*t.touchesDist*this.scale,c<t.options.zoomMin?c=.5*t.options.zoomMin*Math.pow(2,c/t.options.zoomMin):c>t.options.zoomMax&&(c=2*t.options.zoomMax*Math.pow(.5,t.options.zoomMax/c)),t.lastScale=c/this.scale,u=this.originX-this.originX*t.lastScale+this.x,a=this.originY-this.originY*t.lastScale+this.y,this.scroller.style[o]="translate("+u+"px,"+a+"px) scale("+c+")"+k,t.options.onZoom&&t.options.onZoom.call(t,e);return}t.pointX=r.pageX,t.pointY=r.pageY;if(u>0||u<t.maxScrollX)u=t.options.bounce?t.x+i/2:u>=0||t.maxScrollX>=0?0:t.maxScrollX;if(a>t.minScrollY||a<t.maxScrollY)a=t.options.bounce?t.y+s/2:a>=t.minScrollY||t.maxScrollY>=0?t.minScrollY:t.maxScrollY;t.distX+=i,t.distY+=s,t.absDistX=n.abs(t.distX),t.absDistY=n.abs(t.distY);if(t.absDistX<6&&t.absDistY<6)return;t.options.lockDirection&&(t.absDistX>t.absDistY+5?(a=t.y,s=0):t.absDistY>t.absDistX+5&&(u=t.x,i=0)),t.moved=!0,t._pos(u,a),t.dirX=i>0?-1:i<0?1:0,t.dirY=s>0?-1:s<0?1:0,h-t.startTime>300&&(t.startTime=h,t.startX=t.x,t.startY=t.y),t.options.onScrollMove&&t.options.onScrollMove.call(t,e)},_end:function(r){if(m&&r.touches.length!==0)return;var i=this,s=m?r.changedTouches[0]:r,u,f,l={dist:0,time:0},c={dist:0,time:0},h=(r.timeStamp||Date.now())-i.startTime,p=i.x,d=i.y,v,g,y,b,w;i._unbind(E,e),i._unbind(S,e),i._unbind(x,e),i.options.onBeforeScrollEnd&&i.options.onBeforeScrollEnd.call(i,r);if(i.zoomed){w=i.scale*i.lastScale,w=Math.max(i.options.zoomMin,w),w=Math.min(i.options.zoomMax,w),i.lastScale=w/i.scale,i.scale=w,i.x=i.originX-i.originX*i.lastScale+i.x,i.y=i.originY-i.originY*i.lastScale+i.y,i.scroller.style[a]="200ms",i.scroller.style[o]="translate("+i.x+"px,"+i.y+"px) scale("+i.scale+")"+k,i.zoomed=!1,i.refresh(),i.options.onZoomEnd&&i.options.onZoomEnd.call(i,r);return}if(!i.moved){m&&(i.doubleTapTimer&&i.options.zoom?(clearTimeout(i.doubleTapTimer),i.doubleTapTimer=null,i.options.onZoomStart&&i.options.onZoomStart.call(i,r),i.zoom(i.pointX,i.pointY,i.scale==1?i.options.doubleTapZoom:1),i.options.onZoomEnd&&setTimeout(function(){i.options.onZoomEnd.call(i,r)},200)):this.options.handleClick&&(i.doubleTapTimer=setTimeout(function(){i.doubleTapTimer=null,u=s.target;while(u.nodeType!=1)u=u.parentNode;u.tagName!="SELECT"&&u.tagName!="INPUT"&&u.tagName!="TEXTAREA"&&(f=t.createEvent("MouseEvents"),f.initMouseEvent("click",!0,!0,r.view,1,s.screenX,s.screenY,s.clientX,s.clientY,r.ctrlKey,r.altKey,r.shiftKey,r.metaKey,0,null),f._fake=!0,u.dispatchEvent(f))},i.options.zoom?250:0))),i._resetPos(400),i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r);return}if(h<300&&i.options.momentum){l=p?i._momentum(p-i.startX,h,-i.x,i.scrollerW-i.wrapperW+i.x,i.options.bounce?i.wrapperW:0):l,c=d?i._momentum(d-i.startY,h,-i.y,i.maxScrollY<0?i.scrollerH-i.wrapperH+i.y-i.minScrollY:0,i.options.bounce?i.wrapperH:0):c,p=i.x+l.dist,d=i.y+c.dist;if(i.x>0&&p>0||i.x<i.maxScrollX&&p<i.maxScrollX)l={dist:0,time:0};if(i.y>i.minScrollY&&d>i.minScrollY||i.y<i.maxScrollY&&d<i.maxScrollY)c={dist:0,time:0}}if(l.dist||c.dist){y=n.max(n.max(l.time,c.time),10),i.options.snap&&(v=p-i.absStartX,g=d-i.absStartY,n.abs(v)<i.options.snapThreshold&&n.abs(g)<i.options.snapThreshold?i.scrollTo(i.absStartX,i.absStartY,200):(b=i._snap(p,d),p=b.x,d=b.y,y=n.max(b.time,y))),i.scrollTo(n.round(p),n.round(d),y),i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r);return}if(i.options.snap){v=p-i.absStartX,g=d-i.absStartY,n.abs(v)<i.options.snapThreshold&&n.abs(g)<i.options.snapThreshold?i.scrollTo(i.absStartX,i.absStartY,200):(b=i._snap(i.x,i.y),(b.x!=i.x||b.y!=i.y)&&i.scrollTo(b.x,b.y,b.time)),i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r);return}i._resetPos(200),i.options.onTouchEnd&&i.options.onTouchEnd.call(i,r)},_resetPos:function(e){var t=this,n=t.x>=0?0:t.x<t.maxScrollX?t.maxScrollX:t.x,r=t.y>=t.minScrollY||t.maxScrollY>0?t.minScrollY:t.y<t.maxScrollY?t.maxScrollY:t.y;if(n==t.x&&r==t.y){t.moved&&(t.moved=!1,t.options.onScrollEnd&&t.options.onScrollEnd.call(t)),t.hScrollbar&&t.options.hideScrollbar&&(i=="webkit"&&(t.hScrollbarWrapper.style[c]="300ms"),t.hScrollbarWrapper.style.opacity="0"),t.vScrollbar&&t.options.hideScrollbar&&(i=="webkit"&&(t.vScrollbarWrapper.style[c]="300ms"),t.vScrollbarWrapper.style.opacity="0");return}t.scrollTo(n,r,e||0)},_wheel:function(e){var t=this,n,r,i,s,o;if("wheelDeltaX"in e)n=e.wheelDeltaX/12,r=e.wheelDeltaY/12;else if("wheelDelta"in e)n=r=e.wheelDelta/12;else{if(!("detail"in e))return;n=r=-e.detail*3}if(t.options.wheelAction=="zoom"){o=t.scale*Math.pow(2,1/3*(r?r/Math.abs(r):0)),o<t.options.zoomMin&&(o=t.options.zoomMin),o>t.options.zoomMax&&(o=t.options.zoomMax),o!=t.scale&&(!t.wheelZoomCount&&t.options.onZoomStart&&t.options.onZoomStart.call(t,e),t.wheelZoomCount++,t.zoom(e.pageX,e.pageY,o,400),setTimeout(function(){t.wheelZoomCount--,!t.wheelZoomCount&&t.options.onZoomEnd&&t.options.onZoomEnd.call(t,e)},400));return}i=t.x+n,s=t.y+r,i>0?i=0:i<t.maxScrollX&&(i=t.maxScrollX),s>t.minScrollY?s=t.minScrollY:s<t.maxScrollY&&(s=t.maxScrollY),t.maxScrollY<0&&t.scrollTo(i,s,0)},_transitionEnd:function(e){var t=this;if(e.target!=t.scroller)return;t._unbind(T),t._startAni()},_startAni:function(){var e=this,t=e.x,r=e.y,i=Date.now(),s,o,u;if(e.animating)return;if(!e.steps.length){e._resetPos(400);return}s=e.steps.shift(),s.x==t&&s.y==r&&(s.time=0),e.animating=!0,e.moved=!0;if(e.options.useTransition){e._transitionTime(s.time),e._pos(s.x,s.y),e.animating=!1,s.time?e._bind(T):e._resetPos(0);return}u=function(){var a=Date.now(),f,l;if(a>=i+s.time){e._pos(s.x,s.y),e.animating=!1,e.options.onAnimationEnd&&e.options.onAnimationEnd.call(e),e._startAni();return}a=(a-i)/s.time-1,o=n.sqrt(1-a*a),f=(s.x-t)*o+t,l=(s.y-r)*o+r,e._pos(f,l),e.animating&&(e.aniTime=N(u))},u()},_transitionTime:function(e){e+="ms",this.scroller.style[a]=e,this.hScrollbar&&(this.hScrollbarIndicator.style[a]=e),this.vScrollbar&&(this.vScrollbarIndicator.style[a]=e)},_momentum:function(e,t,r,i,s){var o=6e-4,u=n.abs(e)/t,a=u*u/(2*o),f=0,l=0;return e>0&&a>r?(l=s/(6/(a/u*o)),r+=l,u=u*r/a,a=r):e<0&&a>i&&(l=s/(6/(a/u*o)),i+=l,u=u*i/a,a=i),a*=e<0?-1:1,f=u/o,{dist:a,time:n.round(f)}},_offset:function(e){var t=-e.offsetLeft,n=-e.offsetTop;while(e=e.offsetParent)t-=e.offsetLeft,n-=e.offsetTop;return e!=this.wrapper&&(t*=this.scale,n*=this.scale),{left:t,top:n}},_snap:function(e,t){var r=this,i,s,o,u,a,f;o=r.pagesX.length-1;for(i=0,s=r.pagesX.length;i<s;i++)if(e>=r.pagesX[i]){o=i;break}o==r.currPageX&&o>0&&r.dirX<0&&o--,e=r.pagesX[o],a=n.abs(e-r.pagesX[r.currPageX]),a=a?n.abs(r.x-e)/a*500:0,r.currPageX=o,o=r.pagesY.length-1;for(i=0;i<o;i++)if(t>=r.pagesY[i]){o=i;break}return o==r.currPageY&&o>0&&r.dirY<0&&o--,t=r.pagesY[o],f=n.abs(t-r.pagesY[r.currPageY]),f=f?n.abs(r.y-t)/f*500:0,r.currPageY=o,u=n.round(n.max(a,f))||200,{x:e,y:t,time:u}},_bind:function(e,t,n){(t||this.scroller).addEventListener(e,this,!!n)},_unbind:function(e,t,n){(t||this.scroller).removeEventListener(e,this,!!n)},destroy:function(){var t=this;t.scroller.style[o]="",t.hScrollbar=!1,t.vScrollbar=!1,t._scrollbar("h"),t._scrollbar("v"),t._unbind(b,e),t._unbind(w),t._unbind(E,e),t._unbind(S,e),t._unbind(x,e),t.options.hasTouch||(t._unbind("DOMMouseScroll"),t._unbind("mousewheel")),t.options.useTransition&&t._unbind(T),t.options.checkDOMChanges&&clearInterval(t.checkDOMTime),t.options.onDestroy&&t.options.onDestroy.call(t)},refresh:function(){var e=this,t,r,i,s,o=0,u=0;e.scale<e.options.zoomMin&&(e.scale=e.options.zoomMin),e.wrapperW=e.wrapper.clientWidth||1,e.wrapperH=e.wrapper.clientHeight||1,e.minScrollY=-e.options.topOffset||0,e.scrollerW=n.round(e.scroller.offsetWidth*e.scale),e.scrollerH=n.round((e.scroller.offsetHeight+e.minScrollY)*e.scale),e.maxScrollX=e.wrapperW-e.scrollerW,e.maxScrollY=e.wrapperH-e.scrollerH+e.minScrollY,e.dirX=0,e.dirY=0,e.options.onRefresh&&e.options.onRefresh.call(e),e.hScroll=e.options.hScroll&&e.maxScrollX<0,e.vScroll=e.options.vScroll&&(!e.options.bounceLock&&!e.hScroll||e.scrollerH>e.wrapperH),e.hScrollbar=e.hScroll&&e.options.hScrollbar,e.vScrollbar=e.vScroll&&e.options.vScrollbar&&e.scrollerH>e.wrapperH,t=e._offset(e.wrapper),e.wrapperOffsetLeft=-t.left,e.wrapperOffsetTop=-t.top;if(typeof e.options.snap=="string"){e.pagesX=[],e.pagesY=[],s=e.scroller.querySelectorAll(e.options.snap);for(r=0,i=s.length;r<i;r++)o=e._offset(s[r]),o.left+=e.wrapperOffsetLeft,o.top+=e.wrapperOffsetTop,e.pagesX[r]=o.left<e.maxScrollX?e.maxScrollX:o.left*e.scale,e.pagesY[r]=o.top<e.maxScrollY?e.maxScrollY:o.top*e.scale}else if(e.options.snap){e.pagesX=[];while(o>=e.maxScrollX)e.pagesX[u]=o,o-=e.wrapperW,u++;e.maxScrollX%e.wrapperW&&(e.pagesX[e.pagesX.length]=e.maxScrollX-e.pagesX[e.pagesX.length-1]+e.pagesX[e.pagesX.length-1]),o=0,u=0,e.pagesY=[];while(o>=e.maxScrollY)e.pagesY[u]=o,o-=e.wrapperH,u++;e.maxScrollY%e.wrapperH&&(e.pagesY[e.pagesY.length]=e.maxScrollY-e.pagesY[e.pagesY.length-1]+e.pagesY[e.pagesY.length-1])}e._scrollbar("h"),e._scrollbar("v"),e.zoomed||(e.scroller.style[a]="0",e._resetPos(400))},scrollTo:function(e,t,n,r){var i=this,s=e,o,u;i.stop(),s.length||(s=[{x:e,y:t,time:n,relative:r}]);for(o=0,u=s.length;o<u;o++)s[o].relative&&(s[o].x=i.x-s[o].x,s[o].y=i.y-s[o].y),i.steps.push({x:s[o].x,y:s[o].y,time:s[o].time||0});i._startAni()},scrollToElement:function(e,t){var r=this,i;e=e.nodeType?e:r.scroller.querySelector(e);if(!e)return;i=r._offset(e),i.left+=r.wrapperOffsetLeft,i.top+=r.wrapperOffsetTop,i.left=i.left>0?0:i.left<r.maxScrollX?r.maxScrollX:i.left,i.top=i.top>r.minScrollY?r.minScrollY:i.top<r.maxScrollY?r.maxScrollY:i.top,t=t===undefined?n.max(n.abs(i.left)*2,n.abs(i.top)*2):t,r.scrollTo(i.left,i.top,t)},scrollToPage:function(e,t,n){var r=this,i,s;n=n===undefined?400:n,r.options.onScrollStart&&r.options.onScrollStart.call(r),r.options.snap?(e=e=="next"?r.currPageX+1:e=="prev"?r.currPageX-1:e,t=t=="next"?r.currPageY+1:t=="prev"?r.currPageY-1:t,e=e<0?0:e>r.pagesX.length-1?r.pagesX.length-1:e,t=t<0?0:t>r.pagesY.length-1?r.pagesY.length-1:t,r.currPageX=e,r.currPageY=t,i=r.pagesX[e],s=r.pagesY[t]):(i=-r.wrapperW*e,s=-r.wrapperH*t,i<r.maxScrollX&&(i=r.maxScrollX),s<r.maxScrollY&&(s=r.maxScrollY)),r.scrollTo(i,s,n)},disable:function(){this.stop(),this._resetPos(0),this.enabled=!1,this._unbind(E,e),this._unbind(S,e),this._unbind(x,e)},enable:function(){this.enabled=!0},stop:function(){this.options.useTransition?this._unbind(T):C(this.aniTime),this.steps=[],this.moved=!1,this.animating=!1},zoom:function(e,t,n,r){var i=this,s=n/i.scale;if(!i.options.useTransform)return;i.zoomed=!0,r=r===undefined?200:r,e=e-i.wrapperOffsetLeft-i.x,t=t-i.wrapperOffsetTop-i.y,i.x=e-e*s+i.x,i.y=t-t*s+i.y,i.scale=n,i.refresh(),i.x=i.x>0?0:i.x<i.maxScrollX?i.maxScrollX:i.x,i.y=i.y>i.minScrollY?i.minScrollY:i.y<i.maxScrollY?i.maxScrollY:i.y,i.scroller.style[a]=r+"ms",i.scroller.style[o]="translate("+i.x+"px,"+i.y+"px) scale("+n+")"+k,i.zoomed=!1},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating}},r=null,typeof exports!="undefined"?exports.iScroll=L:e.iScroll=L})(window,document);