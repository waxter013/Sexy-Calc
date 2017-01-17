/*
  Future Features: 
    - Store History! Users want this. 
    - Advanced functions (sin, cos, tan, +or-, log, ln, pi, parentheses, degrees, radians)
    - Android Wear (and TV) Support
    - Swipe to change background/theme. 
    - Mortgage Calculator (and other specialty calcs. Maybe make ur own calc for commonly done equations?)
*/ 
/*
  TODO: 
    - Fix errorMsg();
    - Fix decimal button
    - Fix KeyboardEvent Handler
    - Fix backspace key
    - Change CSS: .bttn {cursor: pointer; darken-on-hover; darken-more-and-animate-on-click}
*/

// View
var equationUI = document.getElementsByClassName('equation')[0];
var solutionUI = document.getElementsByClassName('solution')[0];

// Model
var equation = '', 
    solution = '', 
    numbers = [], 
    operators = [],
    previousVal = '';

/* Getters and Setters - Update Model and View Simultaneously*/
function getEquation() {
  return window.equation;
}
function setEquation(val) {
  window.equation = val;
  window.equationUI.value = val;
}
function getSolution() {
  return window.solution;
}
function setSolution(val) {
  window.solution = val;
  window.solutionUI.value = val;
}

// Controller
function bttnHandler(val) {
    //Handle digits
    if (isNum(val)) {
      //If last input was an operator
      if(isOperator(previousVal)) {
        setSolution(''); //reset solution
      }
      if(val === '0') {
        if(previousVal === '/') {
          errorMsg('Cannot divide by zero');
        }
      }
      setSolution(Number(getSolution() + val));
      previousVal = val;
    }
    //Handle simple functions
    else if (isOperator(val)) {
      //Error Handling: Operating on an operator
      if(isOperator(previousVal)) {
        setSolution(getSolution().toString().slice(0, -1));
        errorMsg("Cannot do " + "'" + previousVal + val + "'" + '. ');
      }
      //Set equation
      setEquation((numbers.length === 0)? getSolution() + val: getEquation() + getSolution() + val);
      //Prep for solving
      splitEqn(getEquation());
      //Solve eqn
      var result = solveEqn(numbers, operators); //solve eqn
      setSolution(result);
      previousVal = val;
    }
    //Handle modifier operations/special functions
    else if (val === '.') {
      setSolution(getSolution() + '.');
      previousVal = val;
    } else if (val === 'clear') {
        setEquation('');
        setSolution('');
        previousVal = val;
    } else if (val === 'percent') {
        setSolution(getSolution() * 100);
        previousVal = val;
    } else if (val === 'sqrt') {
        setSolution(Math.sqrt(getSolution()));
        previousVal = val;
    } else if (val === 'squared') {
        setSolution(getSolution() * getSolution());
        previousVal = val;
    } else if (val === 'backspace') {
        setSolution(getSolution().toString().slice(0, -1));
        previousVal = val;
    } else if (val === 'equals') {
        setEquation(getEquation() + getSolution());
        //Prep for solving
        splitEqn(getEquation());
        //Solve eqn
        var result = solveEqn(numbers, operators); //solve eqn
        setSolution(result);
        previousVal = val;
    }
}

//TODO: Fix keypress listener. Change from onkeypress to onkeydown. Adjust keybinding keys. 
//TODO: Change keybindings backspace key to ASCII value of backspace button. 
//Keypress Listener
// document.body.onkeypress = function(event) {
//     var keyBindings = {
//         '/': bttnHandler('/'),
//         '*': bttnHandler('*'),
//         '-': bttnHandler('-'),
//         '+': bttnHandler('+'),
//         '=': bttnHandler('='),
//         'Decimal': bttnHandler('.'),
//         0: bttnHandler('0'),
//         1: bttnHandler('1'),
//         2: bttnHandler('2'),
//         3: bttnHandler('3'),
//         4: bttnHandler('4'),
//         5: bttnHandler('5'),
//         6: bttnHandler('6'),
//         7: bttnHandler('7'),
//         8: bttnHandler('8'),
//         9: bttnHandler('9'),
//         backspace: bttnHandler('backspace')
//     }

//     console.log('key: ' + event.key);

//     if (keyBindings.hasOwnProperty(event.key)) {
//         keyBindings[event.key];
//     }
// }

//Button Click Listener
document.body.onclick = function(event) {
    var currentElemName = event.target.getAttribute('name');
    var buttonNames = {
        //Changing the number
        //If valid, append to  current number
        zero: '0',
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',

        //Changing the number
        //Add to end of currentNum. Only allow once per currentNum. 
        decimalPoint: '.',

        //Operation btwn. two number
        //Add symbol to equation, run parseFloat() on currentNum, 
        //solve previous subproblem, update solution.  
        divide: '/',
        multiply: '*',
        subtract: '-',
        add: '+',
        equals: 'equals',

        //Do stuff to currentNum
        clear: 'clear', //equation = "", currentNumber = ""
        percent: 'percent', //currentNum*100
        squareRoot: 'sqrt', //Math.sqrt();
        squared: 'squared', //currentNum*currentNum
        backspace: 'backspace'
    }

    //If a valid button (in buttonNames) was pressed, 
    if (buttonNames.hasOwnProperty(currentElemName)) {
        bttnHandler(buttonNames[currentElemName]);
    }
    event.stopPropagation();
}

//Solves an equation string, which is simply a lot of simple operations in one string
function solveEqn(nums, ops) {
  var subResult; //Store the result of the previous Simple Operation

  subResult = solveSimple(nums[0], ops[0], nums[1]);
  for(var i = 1, len = operators.length; i < len; i++) {
    if(nums[i+1]) {
      subResult = solveSimple(subResult, ops[i], nums[i+1]);
    }
  }
  return subResult;
}
//Does an operation between two numbers (a simple operation)
function solveSimple(num1, oper, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  // if there's no second number, return empty string
  if(!num2)
    return '';
  else {
    switch (oper) {
      case '*':
        return num1 * num2;
        break;
      case '/':
        return num1 / num2;
        break;
      case '+':
        return num1 + num2;
        break;
      case '-':
        return num1 - num2;
        break;
      default:
        errorMsg("Unknown Operation");
        return 'Unknown Operation';
        break;
    }
  }
}
//Separates equation into numbers and operators
function splitEqn(eqn) {
  numbers = [];
  operators = [];

  //Check that first char is number, else error
  if(isOperator(eqn.charAt(0))) {
    errorMsg("Must start with an operator");
    return 'started with operator';
  }
  for(var i = 0, operPos = 0, len = eqn.length, char = ''; i < len; i++) {
    char = eqn.charAt(i); //Cache current char

    //Handle Operators
    if (isOperator(char)) {
      //Logical Error Handling - Operation on an operation
      if(isOperator(eqn.charAt(i - 1))) {
        errorMsg("Can't do two operators in a row. ");
        return "Can't do two operators in a row. ";
      }
      //If Error Free: Add operator to operators
      else {
        operators.push(char);
      }
      operPos++;
    }
    //Handle Nums
    else if (isNum(char)) {
      //Logical Error Handling - Divide by Zero
      if(char === '0' && eqn.charAt(i - 1) === '/') {
        errorMsg("Can't divide by zero. ");
        return "Can't divide by zero. ";
      }
      //Add digit to end of number
      else if(numbers[operPos]) {
        numbers[operPos] += char;
      }
      //Or add it if it doesn't exist
      else {
        numbers.push(char);
      }
    }
    else {
      errorMsg('Unknown Error. Please contact my creator: deep@deepduggal.me');
      return 'unknown error';
    }
  }
}
function numOps(eqn) {
  var num = 0;
  for(var i = 0, len = eqn.length; i < len; i++) {
    if(isOperator(eqn.charAt(i))) {
      num++;
    }
  }
  return num;
}
function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isOperator(char) {
  return char === '*' || char === '/' || char === '+' || char === '-';
}
//Set equation to error message
function errorMsg(str) {
  var tempSolution = getSolution();
  //Do animation to temporarily show error
  setSolution(str);
}

//Zenscroll
!function(t,e){"function"==typeof define&&define.amd?define([],e()):"object"==typeof module&&module.exports?module.exports=e():t.zenscroll=e()}(this,function(){"use strict";var t=function(t){return"getComputedStyle"in window&&"smooth"===window.getComputedStyle(t)["scroll-behavior"]};if("undefined"==typeof window||!("document"in window))return{};var e=function(e,n,o){n=n||999,o||0===o||(o=9);var i,r=function(t){i=t},c=document.documentElement,u=function(){return e?e.scrollTop:window.scrollY||c.scrollTop},l=function(){return e?Math.min(e.offsetHeight,window.innerHeight):window.innerHeight||c.clientHeight},a=function(t){return e?t.offsetTop:t.getBoundingClientRect().top+u()-c.offsetTop},s=function(){clearTimeout(i),r(0)},f=function(o,i,a){if(s(),t(e?e:document.body))(e||window).scrollTo(0,o),a&&a();else{var f=u(),d=Math.max(o,0)-f;i=i||Math.min(Math.abs(d),n);var h=(new Date).getTime();!function t(){r(setTimeout(function(){var n=Math.min(((new Date).getTime()-h)/i,1),o=Math.max(Math.floor(f+d*(n<.5?2*n*n:n*(4-2*n)-1)),0);e?e.scrollTop=o:window.scrollTo(0,o),n<1&&l()+o<(e||c).scrollHeight?t():(setTimeout(s,99),a&&a())},9))}()}},d=function(t,e,n){var i=a(t)-o;return f(i,e,n),i},h=function(t,e,n){var i=t.getBoundingClientRect().height,r=a(t),c=r+i,s=l(),h=u(),w=h+s;r-o<h||i+o>s?d(t,e,n):c+o>w?f(c-s+o,e,n):n&&n()},w=function(t,e,n,o){f(Math.max(a(t)-l()/2+(n||t.getBoundingClientRect().height/2),0),e,o)},m=function(t,e){t&&(n=t),(0===e||e)&&(o=e)};return{setup:m,to:d,toY:f,intoView:h,center:w,stop:s,moving:function(){return!!i},getY:u}},n=e();if("addEventListener"in window&&!t(document.body)&&!window.noZensmooth){"scrollRestoration"in history&&(history.scrollRestoration="manual",window.addEventListener("popstate",function(t){t.state&&t.state.scrollY&&n.toY(t.state.scrollY)},!1));var o=function(t,e){try{history.replaceState({scrollY:n.getY()},""),history.pushState({scrollY:e},"",t)}catch(t){}};window.addEventListener("click",function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(!(!e||1!==t.which||t.shiftKey||t.metaKey||t.ctrlKey||t.altKey)){var i=e.getAttribute("href")||"";if(0===i.indexOf("#"))if("#"===i)t.preventDefault(),n.toY(0),o(window.location.href.split("#")[0],0);else{var r=e.hash.substring(1),c=document.getElementById(r);c&&(t.preventDefault(),o("#"+r,n.to(c)))}}},!1)}return{createScroller:e,setup:n.setup,to:n.to,toY:n.toY,intoView:n.intoView,center:n.center,stop:n.stop,moving:n.moving}});

window.onload = function() {
  var calc = document.getElementsByClassName('calculator')[0];
  setTimeout(function() {
    zenscroll.center(calc, 250);
  }, 2000);
};