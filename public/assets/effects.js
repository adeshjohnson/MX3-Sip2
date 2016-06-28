// Copyright (c) 2005-2009 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
String.prototype.parseColor=function(){var t="#";if("rgb("==this.slice(0,4)){var e=this.slice(4,this.length-1).split(","),n=0;do t+=parseInt(e[n]).toColorPart();while(++n<3)}else if("#"==this.slice(0,1)){if(4==this.length)for(var n=1;4>n;n++)t+=(this.charAt(n)+this.charAt(n)).toLowerCase();7==this.length&&(t=this.toLowerCase())}return 7==t.length?t:arguments[0]||this},Element.collectTextNodes=function(t){return $A($(t).childNodes).collect(function(t){return 3==t.nodeType?t.nodeValue:t.hasChildNodes()?Element.collectTextNodes(t):""}).flatten().join("")},Element.collectTextNodesIgnoreClass=function(t,e){return $A($(t).childNodes).collect(function(t){return 3==t.nodeType?t.nodeValue:t.hasChildNodes()&&!Element.hasClassName(t,e)?Element.collectTextNodesIgnoreClass(t,e):""}).flatten().join("")},Element.setContentZoom=function(t,e){return t=$(t),t.setStyle({fontSize:e/100+"em"}),Prototype.Browser.WebKit&&window.scrollBy(0,0),t},Element.getInlineOpacity=function(t){return $(t).style.opacity||""},Element.forceRerendering=function(t){try{t=$(t);var e=document.createTextNode(" ");t.appendChild(e),t.removeChild(e)}catch(n){}};var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(t){return-Math.cos(t*Math.PI)/2+.5},reverse:function(t){return 1-t},flicker:function(t){var t=-Math.cos(t*Math.PI)/4+.75+Math.random()/4;return t>1?1:t},wobble:function(t){return-Math.cos(t*Math.PI*9*t)/2+.5},pulse:function(t,e){return-Math.cos(2*t*((e||5)-.5)*Math.PI)/2+.5},spring:function(t){return 1-Math.cos(4.5*t*Math.PI)*Math.exp(6*-t)},none:function(){return 0},full:function(){return 1}},DefaultOptions:{duration:1,fps:100,sync:!1,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(t){var e="position:relative";Prototype.Browser.IE&&(e+=";zoom:1"),t=$(t),$A(t.childNodes).each(function(n){3==n.nodeType&&(n.nodeValue.toArray().each(function(i){t.insertBefore(new Element("span",{style:e}).update(" "==i?String.fromCharCode(160):i),n)}),Element.remove(n))})},multiple:function(t,e){var n;n=("object"==typeof t||Object.isFunction(t))&&t.length?t:$(t).childNodes;var i=Object.extend({speed:.1,delay:0},arguments[2]||{}),o=i.delay;$A(n).each(function(t,n){new e(t,Object.extend(i,{delay:n*i.speed+o}))})},PAIRS:{slide:["SlideDown","SlideUp"],blind:["BlindDown","BlindUp"],appear:["Appear","Fade"]},toggle:function(t,e,n){return t=$(t),e=(e||"appear").toLowerCase(),Effect[Effect.PAIRS[e][t.visible()?1:0]](t,Object.extend({queue:{position:"end",scope:t.id||"global",limit:1}},n||{}))}};Effect.DefaultOptions.transition=Effect.Transitions.sinoidal,Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[],this.interval=null},_each:function(t){this.effects._each(t)},add:function(t){var e=(new Date).getTime(),n=Object.isString(t.options.queue)?t.options.queue:t.options.queue.position;switch(n){case"front":this.effects.findAll(function(t){return"idle"==t.state}).each(function(e){e.startOn+=t.finishOn,e.finishOn+=t.finishOn});break;case"with-last":e=this.effects.pluck("startOn").max()||e;break;case"end":e=this.effects.pluck("finishOn").max()||e}t.startOn+=e,t.finishOn+=e,(!t.options.queue.limit||this.effects.length<t.options.queue.limit)&&this.effects.push(t),this.interval||(this.interval=setInterval(this.loop.bind(this),15))},remove:function(t){this.effects=this.effects.reject(function(e){return e==t}),0==this.effects.length&&(clearInterval(this.interval),this.interval=null)},loop:function(){for(var t=(new Date).getTime(),e=0,n=this.effects.length;n>e;e++)this.effects[e]&&this.effects[e].loop(t)}}),Effect.Queues={instances:$H(),get:function(t){return Object.isString(t)?this.instances.get(t)||this.instances.set(t,new Effect.ScopedQueue):t}},Effect.Queue=Effect.Queues.get("global"),Effect.Base=Class.create({position:null,start:function(t){t&&t.transition===!1&&(t.transition=Effect.Transitions.linear),this.options=Object.extend(Object.extend({},Effect.DefaultOptions),t||{}),this.currentFrame=0,this.state="idle",this.startOn=1e3*this.options.delay,this.finishOn=this.startOn+1e3*this.options.duration,this.fromToDelta=this.options.to-this.options.from,this.totalTime=this.finishOn-this.startOn,this.totalFrames=this.options.fps*this.options.duration,this.render=function(){function t(t,e){t.options[e+"Internal"]&&t.options[e+"Internal"](t),t.options[e]&&t.options[e](t)}return function(e){"idle"===this.state&&(this.state="running",t(this,"beforeSetup"),this.setup&&this.setup(),t(this,"afterSetup")),"running"===this.state&&(e=this.options.transition(e)*this.fromToDelta+this.options.from,this.position=e,t(this,"beforeUpdate"),this.update&&this.update(e),t(this,"afterUpdate"))}}(),this.event("beforeStart"),this.options.sync||Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this)},loop:function(t){if(t>=this.startOn){if(t>=this.finishOn)return this.render(1),this.cancel(),this.event("beforeFinish"),this.finish&&this.finish(),this.event("afterFinish"),void 0;var e=(t-this.startOn)/this.totalTime,n=(e*this.totalFrames).round();n>this.currentFrame&&(this.render(e),this.currentFrame=n)}},cancel:function(){this.options.sync||Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).remove(this),this.state="finished"},event:function(t){this.options[t+"Internal"]&&this.options[t+"Internal"](this),this.options[t]&&this.options[t](this)},inspect:function(){var t=$H();for(property in this)Object.isFunction(this[property])||t.set(property,this[property]);return"#<Effect:"+t.inspect()+",options:"+$H(this.options).inspect()+">"}}),Effect.Parallel=Class.create(Effect.Base,{initialize:function(t){this.effects=t||[],this.start(arguments[1])},update:function(t){this.effects.invoke("render",t)},finish:function(t){this.effects.each(function(e){e.render(1),e.cancel(),e.event("beforeFinish"),e.finish&&e.finish(t),e.event("afterFinish")})}}),Effect.Tween=Class.create(Effect.Base,{initialize:function(t,e,n){t=Object.isString(t)?$(t):t;var i=$A(arguments),o=i.last(),s=5==i.length?i[3]:null;this.method=Object.isFunction(o)?o.bind(t):Object.isFunction(t[o])?t[o].bind(t):function(e){t[o]=e},this.start(Object.extend({from:e,to:n},s||{}))},update:function(t){this.method(t)}}),Effect.Event=Class.create(Effect.Base,{initialize:function(){this.start(Object.extend({duration:0},arguments[0]||{}))},update:Prototype.emptyFunction}),Effect.Opacity=Class.create(Effect.Base,{initialize:function(t){if(this.element=$(t),!this.element)throw Effect._elementDoesNotExistError;Prototype.Browser.IE&&!this.element.currentStyle.hasLayout&&this.element.setStyle({zoom:1});var e=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});this.start(e)},update:function(t){this.element.setOpacity(t)}}),Effect.Move=Class.create(Effect.Base,{initialize:function(t){if(this.element=$(t),!this.element)throw Effect._elementDoesNotExistError;var e=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});this.start(e)},setup:function(){this.element.makePositioned(),this.originalLeft=parseFloat(this.element.getStyle("left")||"0"),this.originalTop=parseFloat(this.element.getStyle("top")||"0"),"absolute"==this.options.mode&&(this.options.x=this.options.x-this.originalLeft,this.options.y=this.options.y-this.originalTop)},update:function(t){this.element.setStyle({left:(this.options.x*t+this.originalLeft).round()+"px",top:(this.options.y*t+this.originalTop).round()+"px"})}}),Effect.MoveBy=function(t,e,n){return new Effect.Move(t,Object.extend({x:n,y:e},arguments[3]||{}))},Effect.Scale=Class.create(Effect.Base,{initialize:function(t,e){if(this.element=$(t),!this.element)throw Effect._elementDoesNotExistError;var n=Object.extend({scaleX:!0,scaleY:!0,scaleContent:!0,scaleFromCenter:!1,scaleMode:"box",scaleFrom:100,scaleTo:e},arguments[2]||{});this.start(n)},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||!1,this.elementPositioning=this.element.getStyle("position"),this.originalStyle={},["top","left","width","height","fontSize"].each(function(t){this.originalStyle[t]=this.element.style[t]}.bind(this)),this.originalTop=this.element.offsetTop,this.originalLeft=this.element.offsetLeft;var t=this.element.getStyle("font-size")||"100%";["em","px","%","pt"].each(function(e){t.indexOf(e)>0&&(this.fontSize=parseFloat(t),this.fontSizeType=e)}.bind(this)),this.factor=(this.options.scaleTo-this.options.scaleFrom)/100,this.dims=null,"box"==this.options.scaleMode&&(this.dims=[this.element.offsetHeight,this.element.offsetWidth]),/^content/.test(this.options.scaleMode)&&(this.dims=[this.element.scrollHeight,this.element.scrollWidth]),this.dims||(this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth])},update:function(t){var e=this.options.scaleFrom/100+this.factor*t;this.options.scaleContent&&this.fontSize&&this.element.setStyle({fontSize:this.fontSize*e+this.fontSizeType}),this.setDimensions(this.dims[0]*e,this.dims[1]*e)},finish:function(){this.restoreAfterFinish&&this.element.setStyle(this.originalStyle)},setDimensions:function(t,e){var n={};if(this.options.scaleX&&(n.width=e.round()+"px"),this.options.scaleY&&(n.height=t.round()+"px"),this.options.scaleFromCenter){var i=(t-this.dims[0])/2,o=(e-this.dims[1])/2;"absolute"==this.elementPositioning?(this.options.scaleY&&(n.top=this.originalTop-i+"px"),this.options.scaleX&&(n.left=this.originalLeft-o+"px")):(this.options.scaleY&&(n.top=-i+"px"),this.options.scaleX&&(n.left=-o+"px"))}this.element.setStyle(n)}}),Effect.Highlight=Class.create(Effect.Base,{initialize:function(t){if(this.element=$(t),!this.element)throw Effect._elementDoesNotExistError;var e=Object.extend({startcolor:"#ffff99"},arguments[1]||{});this.start(e)},setup:function(){return"none"==this.element.getStyle("display")?(this.cancel(),void 0):(this.oldStyle={},this.options.keepBackgroundImage||(this.oldStyle.backgroundImage=this.element.getStyle("background-image"),this.element.setStyle({backgroundImage:"none"})),this.options.endcolor||(this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff")),this.options.restorecolor||(this.options.restorecolor=this.element.getStyle("background-color")),this._base=$R(0,2).map(function(t){return parseInt(this.options.startcolor.slice(2*t+1,2*t+3),16)}.bind(this)),this._delta=$R(0,2).map(function(t){return parseInt(this.options.endcolor.slice(2*t+1,2*t+3),16)-this._base[t]}.bind(this)),void 0)},update:function(t){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(e,n,i){return e+(this._base[i]+this._delta[i]*t).round().toColorPart()}.bind(this))})},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))}}),Effect.ScrollTo=function(t){var e=arguments[1]||{},n=document.viewport.getScrollOffsets(),i=$(t).cumulativeOffset();return e.offset&&(i[1]+=e.offset),new Effect.Tween(null,n.top,i[1],e,function(t){scrollTo(n.left,t.round())})},Effect.Fade=function(t){t=$(t);var e=t.getInlineOpacity(),n=Object.extend({from:t.getOpacity()||1,to:0,afterFinishInternal:function(t){0==t.options.to&&t.element.hide().setStyle({opacity:e})}},arguments[1]||{});return new Effect.Opacity(t,n)},Effect.Appear=function(t){t=$(t);var e=Object.extend({from:"none"==t.getStyle("display")?0:t.getOpacity()||0,to:1,afterFinishInternal:function(t){t.element.forceRerendering()},beforeSetup:function(t){t.element.setOpacity(t.options.from).show()}},arguments[1]||{});return new Effect.Opacity(t,e)},Effect.Puff=function(t){t=$(t);var e={opacity:t.getInlineOpacity(),position:t.getStyle("position"),top:t.style.top,left:t.style.left,width:t.style.width,height:t.style.height};return new Effect.Parallel([new Effect.Scale(t,200,{sync:!0,scaleFromCenter:!0,scaleContent:!0,restoreAfterFinish:!0}),new Effect.Opacity(t,{sync:!0,to:0})],Object.extend({duration:1,beforeSetupInternal:function(t){Position.absolutize(t.effects[0].element)},afterFinishInternal:function(t){t.effects[0].element.hide().setStyle(e)}},arguments[1]||{}))},Effect.BlindUp=function(t){return t=$(t),t.makeClipping(),new Effect.Scale(t,0,Object.extend({scaleContent:!1,scaleX:!1,restoreAfterFinish:!0,afterFinishInternal:function(t){t.element.hide().undoClipping()}},arguments[1]||{}))},Effect.BlindDown=function(t){t=$(t);var e=t.getDimensions();return new Effect.Scale(t,100,Object.extend({scaleContent:!1,scaleX:!1,scaleFrom:0,scaleMode:{originalHeight:e.height,originalWidth:e.width},restoreAfterFinish:!0,afterSetup:function(t){t.element.makeClipping().setStyle({height:"0px"}).show()},afterFinishInternal:function(t){t.element.undoClipping()}},arguments[1]||{}))},Effect.SwitchOff=function(t){t=$(t);var e=t.getInlineOpacity();return new Effect.Appear(t,Object.extend({duration:.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(t){new Effect.Scale(t.element,1,{duration:.3,scaleFromCenter:!0,scaleX:!1,scaleContent:!1,restoreAfterFinish:!0,beforeSetup:function(t){t.element.makePositioned().makeClipping()},afterFinishInternal:function(t){t.element.hide().undoClipping().undoPositioned().setStyle({opacity:e})}})}},arguments[1]||{}))},Effect.DropOut=function(t){t=$(t);var e={top:t.getStyle("top"),left:t.getStyle("left"),opacity:t.getInlineOpacity()};return new Effect.Parallel([new Effect.Move(t,{x:0,y:100,sync:!0}),new Effect.Opacity(t,{sync:!0,to:0})],Object.extend({duration:.5,beforeSetup:function(t){t.effects[0].element.makePositioned()},afterFinishInternal:function(t){t.effects[0].element.hide().undoPositioned().setStyle(e)}},arguments[1]||{}))},Effect.Shake=function(t){t=$(t);var e=Object.extend({distance:20,duration:.5},arguments[1]||{}),n=parseFloat(e.distance),i=parseFloat(e.duration)/10,o={top:t.getStyle("top"),left:t.getStyle("left")};return new Effect.Move(t,{x:n,y:0,duration:i,afterFinishInternal:function(t){new Effect.Move(t.element,{x:2*-n,y:0,duration:2*i,afterFinishInternal:function(t){new Effect.Move(t.element,{x:2*n,y:0,duration:2*i,afterFinishInternal:function(t){new Effect.Move(t.element,{x:2*-n,y:0,duration:2*i,afterFinishInternal:function(t){new Effect.Move(t.element,{x:2*n,y:0,duration:2*i,afterFinishInternal:function(t){new Effect.Move(t.element,{x:-n,y:0,duration:i,afterFinishInternal:function(t){t.element.undoPositioned().setStyle(o)}})}})}})}})}})}})},Effect.SlideDown=function(t){t=$(t).cleanWhitespace();var e=t.down().getStyle("bottom"),n=t.getDimensions();return new Effect.Scale(t,100,Object.extend({scaleContent:!1,scaleX:!1,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:n.height,originalWidth:n.width},restoreAfterFinish:!0,afterSetup:function(t){t.element.makePositioned(),t.element.down().makePositioned(),window.opera&&t.element.setStyle({top:""}),t.element.makeClipping().setStyle({height:"0px"}).show()},afterUpdateInternal:function(t){t.element.down().setStyle({bottom:t.dims[0]-t.element.clientHeight+"px"})},afterFinishInternal:function(t){t.element.undoClipping().undoPositioned(),t.element.down().undoPositioned().setStyle({bottom:e})}},arguments[1]||{}))},Effect.SlideUp=function(t){t=$(t).cleanWhitespace();var e=t.down().getStyle("bottom"),n=t.getDimensions();return new Effect.Scale(t,window.opera?0:1,Object.extend({scaleContent:!1,scaleX:!1,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:n.height,originalWidth:n.width},restoreAfterFinish:!0,afterSetup:function(t){t.element.makePositioned(),t.element.down().makePositioned(),window.opera&&t.element.setStyle({top:""}),t.element.makeClipping().show()},afterUpdateInternal:function(t){t.element.down().setStyle({bottom:t.dims[0]-t.element.clientHeight+"px"})},afterFinishInternal:function(t){t.element.hide().undoClipping().undoPositioned(),t.element.down().undoPositioned().setStyle({bottom:e})}},arguments[1]||{}))},Effect.Squish=function(t){return new Effect.Scale(t,window.opera?1:0,{restoreAfterFinish:!0,beforeSetup:function(t){t.element.makeClipping()},afterFinishInternal:function(t){t.element.hide().undoClipping()}})},Effect.Grow=function(t){t=$(t);var e,n,i,o,s=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{}),r={top:t.style.top,left:t.style.left,height:t.style.height,width:t.style.width,opacity:t.getInlineOpacity()},a=t.getDimensions();switch(s.direction){case"top-left":e=n=i=o=0;break;case"top-right":e=a.width,n=o=0,i=-a.width;break;case"bottom-left":e=i=0,n=a.height,o=-a.height;break;case"bottom-right":e=a.width,n=a.height,i=-a.width,o=-a.height;break;case"center":e=a.width/2,n=a.height/2,i=-a.width/2,o=-a.height/2}return new Effect.Move(t,{x:e,y:n,duration:.01,beforeSetup:function(t){t.element.hide().makeClipping().makePositioned()},afterFinishInternal:function(t){new Effect.Parallel([new Effect.Opacity(t.element,{sync:!0,to:1,from:0,transition:s.opacityTransition}),new Effect.Move(t.element,{x:i,y:o,sync:!0,transition:s.moveTransition}),new Effect.Scale(t.element,100,{scaleMode:{originalHeight:a.height,originalWidth:a.width},sync:!0,scaleFrom:window.opera?1:0,transition:s.scaleTransition,restoreAfterFinish:!0})],Object.extend({beforeSetup:function(t){t.effects[0].element.setStyle({height:"0px"}).show()},afterFinishInternal:function(t){t.effects[0].element.undoClipping().undoPositioned().setStyle(r)}},s))}})},Effect.Shrink=function(t){t=$(t);var e,n,i=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{}),o={top:t.style.top,left:t.style.left,height:t.style.height,width:t.style.width,opacity:t.getInlineOpacity()},s=t.getDimensions();switch(i.direction){case"top-left":e=n=0;break;case"top-right":e=s.width,n=0;break;case"bottom-left":e=0,n=s.height;break;case"bottom-right":e=s.width,n=s.height;break;case"center":e=s.width/2,n=s.height/2}return new Effect.Parallel([new Effect.Opacity(t,{sync:!0,to:0,from:1,transition:i.opacityTransition}),new Effect.Scale(t,window.opera?1:0,{sync:!0,transition:i.scaleTransition,restoreAfterFinish:!0}),new Effect.Move(t,{x:e,y:n,sync:!0,transition:i.moveTransition})],Object.extend({beforeStartInternal:function(t){t.effects[0].element.makePositioned().makeClipping()},afterFinishInternal:function(t){t.effects[0].element.hide().undoClipping().undoPositioned().setStyle(o)}},i))},Effect.Pulsate=function(t){t=$(t);var e=arguments[1]||{},n=t.getInlineOpacity(),i=e.transition||Effect.Transitions.linear,o=function(t){return 1-i(-Math.cos(2*t*(e.pulses||5)*Math.PI)/2+.5)};return new Effect.Opacity(t,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(t){t.element.setStyle({opacity:n})}},e),{transition:o}))},Effect.Fold=function(t){t=$(t);var e={top:t.style.top,left:t.style.left,width:t.style.width,height:t.style.height};return t.makeClipping(),new Effect.Scale(t,5,Object.extend({scaleContent:!1,scaleX:!1,afterFinishInternal:function(){new Effect.Scale(t,1,{scaleContent:!1,scaleY:!1,afterFinishInternal:function(t){t.element.hide().undoClipping().setStyle(e)}})}},arguments[1]||{}))},Effect.Morph=Class.create(Effect.Base,{initialize:function(t){if(this.element=$(t),!this.element)throw Effect._elementDoesNotExistError;var e=Object.extend({style:{}},arguments[1]||{});if(Object.isString(e.style))if(e.style.include(":"))this.style=e.style.parseStyle();else{this.element.addClassName(e.style),this.style=$H(this.element.getStyles()),this.element.removeClassName(e.style);var n=this.element.getStyles();this.style=this.style.reject(function(t){return t.value==n[t.key]}),e.afterFinishInternal=function(t){t.element.addClassName(t.options.style),t.transforms.each(function(e){t.element.style[e.style]=""})}}else this.style=$H(e.style);this.start(e)},setup:function(){function t(t){return(!t||["rgba(0, 0, 0, 0)","transparent"].include(t))&&(t="#ffffff"),t=t.parseColor(),$R(0,2).map(function(e){return parseInt(t.slice(2*e+1,2*e+3),16)})}this.transforms=this.style.map(function(e){var n=e[0],i=e[1],o=null;if("#zzzzzz"!=i.parseColor("#zzzzzz"))i=i.parseColor(),o="color";else if("opacity"==n)i=parseFloat(i),Prototype.Browser.IE&&!this.element.currentStyle.hasLayout&&this.element.setStyle({zoom:1});else if(Element.CSS_LENGTH.test(i)){var s=i.match(/^([\+\-]?[0-9\.]+)(.*)$/);i=parseFloat(s[1]),o=3==s.length?s[2]:null}var r=this.element.getStyle(n);return{style:n.camelize(),originalValue:"color"==o?t(r):parseFloat(r||0),targetValue:"color"==o?t(i):i,unit:o}}.bind(this)).reject(function(t){return t.originalValue==t.targetValue||"color"!=t.unit&&(isNaN(t.originalValue)||isNaN(t.targetValue))})},update:function(t){for(var e,n={},i=this.transforms.length;i--;)n[(e=this.transforms[i]).style]="color"==e.unit?"#"+Math.round(e.originalValue[0]+(e.targetValue[0]-e.originalValue[0])*t).toColorPart()+Math.round(e.originalValue[1]+(e.targetValue[1]-e.originalValue[1])*t).toColorPart()+Math.round(e.originalValue[2]+(e.targetValue[2]-e.originalValue[2])*t).toColorPart():(e.originalValue+(e.targetValue-e.originalValue)*t).toFixed(3)+(null===e.unit?"":e.unit);this.element.setStyle(n,!0)}}),Effect.Transform=Class.create({initialize:function(t){this.tracks=[],this.options=arguments[1]||{},this.addTracks(t)},addTracks:function(t){return t.each(function(t){t=$H(t);var e=t.values().first();this.tracks.push($H({ids:t.keys().first(),effect:Effect.Morph,options:{style:e}}))}.bind(this)),this},play:function(){return new Effect.Parallel(this.tracks.map(function(t){var e=t.get("ids"),n=t.get("effect"),i=t.get("options"),o=[$(e)||$$(e)].flatten();return o.map(function(t){return new n(t,Object.extend({sync:!0},i))})}).flatten(),this.options)}}),Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex"),Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/,String.__parseStyleElement=document.createElement("div"),String.prototype.parseStyle=function(){var t,e=$H();return Prototype.Browser.WebKit?t=new Element("div",{style:this}).style:(String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>',t=String.__parseStyleElement.childNodes[0].style),Element.CSS_PROPERTIES.each(function(n){t[n]&&e.set(n,t[n])}),Prototype.Browser.IE&&this.include("opacity")&&e.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1]),e},Element.getStyles=document.defaultView&&document.defaultView.getComputedStyle?function(t){var e=document.defaultView.getComputedStyle($(t),null);return Element.CSS_PROPERTIES.inject({},function(t,n){return t[n]=e[n],t})}:function(t){t=$(t);var e,n=t.currentStyle;return e=Element.CSS_PROPERTIES.inject({},function(t,e){return t[e]=n[e],t}),e.opacity||(e.opacity=t.getOpacity()),e},Effect.Methods={morph:function(t,e){return t=$(t),new Effect.Morph(t,Object.extend({style:e},arguments[2]||{})),t},visualEffect:function(t,e,n){t=$(t);var i=e.dasherize().camelize(),o=i.charAt(0).toUpperCase()+i.substring(1);return new Effect[o](t,n),t},highlight:function(t,e){return t=$(t),new Effect.Highlight(t,e),t}},$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(t){Effect.Methods[t]=function(e,n){return e=$(e),Effect[t.charAt(0).toUpperCase()+t.substring(1)](e,n),e}}),$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(t){Effect.Methods[t]=Element[t]}),Element.addMethods(Effect.Methods);