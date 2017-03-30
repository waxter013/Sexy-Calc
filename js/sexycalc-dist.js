function getEquation(){return window.equation}function setEquation(e){window.equation=e,window.equationUI.value=e}function getSolution(){return window.solution}function setSolution(e){window.solution=e,window.solutionUI.value=e}function bttnHandler(e){if(isErrorOngoing)return"equals"===e&&(isErrorOngoing=!0),"";if(isNum(e)){if(isOperator(previousVal)&&setSolution(""),"0"===e&&"/"===previousVal)return errorMsg("Cannot divide by zero"),"";setSolution(Number(getSolution()+e)),previousVal=e}else if(isOperator(e))if(isOperator(previousVal))errorMsg("Cannot do two operators in a row. "),setSolution(getSolution().toString().slice(0,-1));else if("equals"===previousVal)setEquation(0===numbers.length?getEquation():getEquation()+e),setSolution("");else{setEquation(0===numbers.length?getSolution()+e:getEquation()+getSolution()+e),splitEqn(getEquation());var t=solveEqn(numbers,operators);setSolution(t),previousVal=e}else if("."===e)setSolution(getSolution()+"."),previousVal=e;else if("clear"===e)setEquation(""),setSolution(""),previousVal=e;else if("percent"===e)setSolution(100*getSolution()),previousVal=e;else if("sqrt"===e)setSolution(Math.sqrt(getSolution())),previousVal=e;else if("squared"===e)setSolution(getSolution()*getSolution()),previousVal=e;else if("backspace"===e)""===getSolution()&&setEquation(getEquation().toString().slice(0,-1)),setSolution(getSolution().toString().slice(0,-1)),previousVal=e;else if("equals"===e){setEquation(getEquation()+getSolution()),splitEqn(getEquation());var t=solveEqn(numbers,operators);setSolution(t),previousVal=e}}function solveEqn(e,t){var o;o=solveSimple(e[0],t[0],e[1]);for(var n=1,r=operators.length;n<r;n++)e[n+1]&&(o=solveSimple(o,t[n],e[n+1]));return o}function solveSimple(e,t,o){if(e=Number(e),!(o=Number(o)))return"";switch(t){case"*":return e*o;case"/":return e/o;case"+":return e+o;case"-":return e-o;default:return errorMsg("Unknown Operation"),"Unknown Operation"}}function splitEqn(e){if(numbers=[],operators=[],isOperator(e.charAt(0)))return errorMsg("Must start with an operator"),"started with operator";for(var t=0,o=0,n=e.length,r="";t<n;t++)if(r=e.charAt(t),isOperator(r)){if(isOperator(e.charAt(t-1)))return errorMsg("Can't do two operators in a row. "),"Can't do two operators in a row. ";operators.push(r),o++}else{if(!isNum(r))return console.log("Unknown Error. Please contact my creator: deep@deepduggal.me"),"";if("0"===r&&"/"===e.charAt(t-1))return errorMsg("Can't divide by zero. "),"Can't divide by zero. ";numbers[o]?numbers[o]+=r:numbers.push(r)}}function numOps(e){for(var t=0,o=0,n=e.length;o<n;o++)isOperator(e.charAt(o))&&t++;return t}function isNum(e){return!isNaN(parseFloat(e))&&isFinite(e)}function isOperator(e){return"*"===e||"/"===e||"+"===e||"-"===e}function errorMsg(e){isErrorOngoing=!0,error.innerText=e,TweenMax.to(error,.3,{top:"1rem",display:"block"}),setTimeout(function(){TweenMax.to(error,.2,{top:"-50%",display:"none"}),isErrorOngoing=!1},3e3)}var logo=document.getElementsByClassName("logo")[0],error=document.getElementsByClassName("error")[0],calc=document.getElementsByClassName("calculator")[0],equationUI=document.getElementsByClassName("equation")[0],solutionUI=document.getElementsByClassName("solution")[0],equation="",solution="",numbers=[],operators=[],previousVal="",isErrorOngoing=!1;document.body.onkeydown=function(e){e.stopPropagation();var t={"/":"/","*":"*","-":"-","+":"+","=":"=",".":".",0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",Backspace:"backspace",Enter:"equals",Clear:"equals"," ":"equals",Spacebar:"equals"};e.key&&t.hasOwnProperty(e.key)&&(e.preventDefault(),bttnHandler(t[e.key]))},document.body.onclick=function(e){e.stopPropagation();var t=e.target.getAttribute("name"),o={zero:"0",one:"1",two:"2",three:"3",four:"4",five:"5",six:"6",seven:"7",eight:"8",nine:"9",decimalPoint:".",divide:"/",multiply:"*",subtract:"-",add:"+",equals:"equals",clear:"clear",percent:"percent",squareRoot:"sqrt",squared:"squared",backspace:"backspace"};o.hasOwnProperty(t)&&(e.preventDefault(),bttnHandler(o[t]))},window.onload=function(){TweenMax.to(window,.25,{delay:"1.5",scrollTo:window.innerHeight})},logo.onclick=function(){TweenMax.to(window,.25,{scrollTo:window.innerHeight})};