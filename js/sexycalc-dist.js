function getEquation(){return window.equation}function setEquation(e){window.equation=e,window.equationUI.value=e}function getSolution(){return window.solution}function setSolution(e){window.solution=e,window.solutionUI.value=e}function bttnHandler(e){if(isNum(e)){if(isOperator(previousVal)&&setSolution(""),"0"===e&&"/"===previousVal)return errorMsg("Cannot divide by zero"),"";setSolution(Number(getSolution()+e)),previousVal=e}else if(isOperator(e)){isOperator(previousVal)&&(errorMsg("Cannot do '"+previousVal+e+"'. "),setSolution(getSolution().toString().slice(0,-1))),setEquation(0===numbers.length?getSolution()+e:getEquation()+getSolution()+e),splitEqn(getEquation());var t=solveEqn(numbers,operators);setSolution(t),previousVal=e}else if("."===e)setSolution(getSolution()+"."),previousVal=e;else if("clear"===e)setEquation(""),setSolution(""),previousVal=e;else if("percent"===e)setSolution(100*getSolution()),previousVal=e;else if("sqrt"===e)setSolution(Math.sqrt(getSolution())),previousVal=e;else if("squared"===e)setSolution(getSolution()*getSolution()),previousVal=e;else if("backspace"===e)""===getSolution()&&setEquation(getEquation().toString().slice(0,-1)),setSolution(getSolution().toString().slice(0,-1)),previousVal=e;else if("equals"===e){setEquation(getEquation()+getSolution()),splitEqn(getEquation());var t=solveEqn(numbers,operators);setSolution(t),previousVal=e}}function solveEqn(e,t){var o;o=solveSimple(e[0],t[0],e[1]);for(var n=1,r=operators.length;n<r;n++)e[n+1]&&(o=solveSimple(o,t[n],e[n+1]));return o}function solveSimple(e,t,o){if(e=Number(e),o=Number(o),!o)return"";switch(t){case"*":return e*o;case"/":return e/o;case"+":return e+o;case"-":return e-o;default:return errorMsg("Unknown Operation"),"Unknown Operation"}}function splitEqn(e){if(numbers=[],operators=[],isOperator(e.charAt(0)))return errorMsg("Must start with an operator"),"started with operator";for(var t=0,o=0,n=e.length,r="";t<n;t++)if(r=e.charAt(t),isOperator(r)){if(isOperator(e.charAt(t-1)))return errorMsg("Can't do two operators in a row. "),"Can't do two operators in a row. ";operators.push(r),o++}else{if(!isNum(r))return errorMsg("Unknown Error. Please contact my creator: deep@deepduggal.me"),"unknown error";if("0"===r&&"/"===e.charAt(t-1))return errorMsg("Can't divide by zero. "),"Can't divide by zero. ";numbers[o]?numbers[o]+=r:numbers.push(r)}}function numOps(e){for(var t=0,o=0,n=e.length;o<n;o++)isOperator(e.charAt(o))&&t++;return t}function isNum(e){return!isNaN(parseFloat(e))&&isFinite(e)}function isOperator(e){return"*"===e||"/"===e||"+"===e||"-"===e}function errorMsg(e){getSolution();setEquation(" "),setSolution(" "),setEquation(e),setSolution(e)}var logo=document.getElementsByClassName("logo")[0],calc=document.getElementsByClassName("calculator")[0],equationUI=document.getElementsByClassName("equation")[0],solutionUI=document.getElementsByClassName("solution")[0],equation="",solution="",numbers=[],operators=[],previousVal="";document.body.onkeydown=function(e){e.stopPropagation();var t={"/":"/","*":"*","-":"-","+":"+","=":"=",".":".",0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",Backspace:"backspace",Enter:"equals",Clear:"equals"," ":"equals",Spacebar:"equals"};e.key&&t.hasOwnProperty(e.key)&&(e.preventDefault(),bttnHandler(t[e.key]))},document.body.onclick=function(e){e.stopPropagation();var t=e.target.getAttribute("name"),o={zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",decimalPoint:".",divide:"/",multiply:"*",subtract:"-",add:"+",equals:"equals",clear:"clear",percent:"percent",squareRoot:"sqrt",squared:"squared",backspace:"backspace"};o.hasOwnProperty(t)&&(e.preventDefault(),bttnHandler(o[t]))},!function(e,t){"function"==typeof define&&define.amd?define([],t()):"object"==typeof module&&module.exports?module.exports=t():e.zenscroll=t()}(this,function(){"use strict";var e=function(e){return"getComputedStyle"in window&&"smooth"===window.getComputedStyle(e)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var t=function(t,o,n){o=o||999,n||0===n||(n=9);var r,i=function(e){r=e},s=document.documentElement,u=function(){return t?t.scrollTop:window.scrollY||s.scrollTop},a=function(){return t?Math.min(t.offsetHeight,window.innerHeight):window.innerHeight||s.clientHeight},l=function(e){return t?e.offsetTop:e.getBoundingClientRect().top+u()-s.offsetTop},c=function(){clearTimeout(r),i(0)},p=function(n,r,l){if(c(),e(t?t:document.body))(t||window).scrollTo(0,n),l&&l();else{var p=u(),f=Math.max(n,0)-p;r=r||Math.min(Math.abs(f),o);var d=(new Date).getTime();!function e(){i(setTimeout(function(){var o=Math.min(((new Date).getTime()-d)/r,1),n=Math.max(Math.floor(p+f*(o<.5?2*o*o:o*(4-2*o)-1)),0);t?t.scrollTop=n:window.scrollTo(0,n),o<1&&a()+n<(t||s).scrollHeight?e():(setTimeout(c,99),l&&l())},9))}()}},f=function(e,t,o){var r=l(e)-n;return p(r,t,o),r},d=function(e,t,o){var r=e.getBoundingClientRect().height,i=l(e),s=i+r,c=a(),d=u(),g=d+c;i-n<d||r+n>c?f(e,t,o):s+n>g?p(s-c+n,t,o):o&&o()},g=function(e,t,o,n){p(Math.max(l(e)-a()/2+(o||e.getBoundingClientRect().height/2),0),t,n)},m=function(e,t){e&&(o=e),(0===t||t)&&(n=t)};return{setup:m,to:f,toY:p,intoView:d,center:g,stop:c,moving:function(){return!!r},getY:u}},o=t();if("addEventListener"in window&&!e(document.body)&&!window.noZensmooth){"scrollRestoration"in history&&(history.scrollRestoration="manual",window.addEventListener("popstate",function(e){e.state&&e.state.scrollY&&o.toY(e.state.scrollY)},!1));var n=function(e,t){try{history.replaceState({scrollY:o.getY()},""),history.pushState({scrollY:t},"",e)}catch(e){}};window.addEventListener("click",function(e){for(var t=e.target;t&&"A"!==t.tagName;)t=t.parentNode;if(!(!t||1!==e.which||e.shiftKey||e.metaKey||e.ctrlKey||e.altKey)){var r=t.getAttribute("href")||"";if(0===r.indexOf("#"))if("#"===r)e.preventDefault(),o.toY(0),n(window.location.href.split("#")[0],0);else{var i=t.hash.substring(1),s=document.getElementById(i);s&&(e.preventDefault(),n("#"+i,o.to(s)))}}},!1)}return{createScroller:t,setup:o.setup,to:o.to,toY:o.toY,intoView:o.intoView,center:o.center,stop:o.stop,moving:o.moving}}),window.onload=function(){setTimeout(function(){zenscroll.center(calc,250)},1500)},logo.onclick=function(){zenscroll.center(calc,250)};