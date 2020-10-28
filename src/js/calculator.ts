/*
  TODO: 
    - Limit numDigits to max supported by JS
    - anything * 0 doesn't work
*/

import { TweenMax } from 'gsap';
import { showError, hideError } from './animations';
import { isNum, isOperator, isDecimal } from './utils';

// View
var moreBttns = document.querySelector('moreBttns'),
      normalBttns = document.forms[0],
      advancedBttns = document.forms[1],
      error = document.getElementsByClassName('error')[0], // error popup
      calc = document.getElementsByClassName('calculator')[0], // calculator
      equationUI = document.getElementsByClassName('equation')[0], // display equation
      solutionUI = document.getElementsByClassName('solution')[0]; // display solution

// Model
var equation: string = '', 
    solution: string = '', 
    numbers: string[] = [], 
    operators: string[] = [],
    previousVal: string = '',
    isErrorOngoing: boolean = false;



/* Getters and Setters */
function getEquation() {
  return equation;
}
function setEquation(val: string) {
  equation = val;
  equationUI.value = val;
}
function getSolution() {
  return solution;
}
function setSolution(val: string) {
  solution = val;
  solutionUI.value = val;
}

// Handle input
function bttnHandler(val: string) {
    if(isErrorOngoing) {
      if(val === 'clear') {
        TweenMax.to(error, 0.3, {top: '-50%', ease: Back.easeIn.config(2), display: 'none'}); //hide error
        isErrorOngoing = false; //end error
      }
      return ''; //Do nothing
    }
    //Handle digits
    else if (isNum(val)) {
      //If last input was an operator
      if(isOperator(previousVal)) {
        setSolution(''); //reset solution
      }
      if(val === '0') {
        if(previousVal === '/') {
          errorMsg('Cannot divide by zero');
          return '';
        }
      }
      setSolution(Number(getSolution() + val));
      previousVal = val;
    }
    //Handle simple functions
    else if (isOperator(val)) {
      //Error Handling: Operating on an operator
      if(isOperator(previousVal)) {
        errorMsg("Cannot do two operators in a row. ");
        setSolution(getSolution().toString().slice(0, -1));
      }
      //Error Handling: Operation after equals
      else if(previousVal === 'equals') {
        setEquation((numbers.length === 0)? getEquation(): getEquation() + val);
        setSolution('');
      }
      else {
        //Set equation
        setEquation((numbers.length === 0)? getSolution() + val: getEquation() + getSolution() + val);
        //Prep for solving
        splitEqn(getEquation());
        //Solve eqn
        var result = solveEqn(numbers, operators); //solve eqn
        setSolution(result);
        previousVal = val;
      }
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
        //Hide error msg if showing
        if(isErrorOngoing && val === 'clear') {
          TweenMax.to(error, 0.3, {top: '-50%', ease: Back.easeIn.config(2), display: 'none'}); //hide error
          isErrorOngoing = false; //end error
        }
        //If solution is empty, backspace equation
        else if(getSolution() === '') {
          setEquation(getEquation().toString().slice(0, -1));
        }
        //Otherwise backspace solution
        else {
          setSolution(getSolution().toString().slice(0, -1));
        }
        previousVal = getSolution().toString().substr(-1);
    } else if (val === 'equals') {
        if(previousVal === 'equals') {
          return '';
        }
        setEquation(getEquation() + getSolution());
        //Prep for solving
        splitEqn(getEquation());
        //Solve eqn
        var result = solveEqn(numbers, operators); //solve eqn
        setSolution(result);
        previousVal = val;
    }
}

// Solves an equation string, which is simply a lot of simple operations in one string
function solveEqn(nums: number[], ops: string[]) {
  var subResult; //Store the result of the previous Simple Operation

  subResult = solveSimple(nums[0], ops[0], nums[1]);
  for(var i = 1, len = operators.length; i < len; i++) {
    if(nums[i+1]) {
      subResult = solveSimple(subResult, ops[i], nums[i+1]);
    }
  }
  return subResult;
}
// Does an operation between two numbers (a simple operation)
function solveSimple(num1: number, oper: string, num2: number) {
  num1 = Number(num1);
  num2 = Number(num2);
  // if there's no second number, return empty string
  if (!num2)
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

// Separates equation into numbers and operators
function splitEqn(eqn: string) {
  let wasDecimalFound = false;

  // Reset previous equation's values
  numbers = [];
  operators = [];

  // Check that first char is number, else error
  if (isOperator(eqn.charAt(0))) {
    errorMsg("Must start with an operator");
    return;
  }
  for(var i = 0, operPos = 0, len = eqn.length, char = ''; i < len; i++) {
    char = eqn.charAt(i); // Store current char

    // Handle Operators
    if (isOperator(char)) {
      // We can safely say the previous char isn't part of a decimal value
      // bc an operator can't be in the middle of a valid number
      if (wasDecimalFound) {
        wasDecimalFound = false;
      }

      // Logical Error Handling - Operation on an operation
      if (isOperator(eqn.charAt(i - 1))) {
        errorMsg("Can't do two operators in a row. ");
        return "Can't do two operators in a row. ";
      }
      // If Error Free: Add operator to operators
      else {
        operators.push(char);
      }
      operPos++;
    }
    // Handle Nums
    else if (isNum(char)) {
      // Logical Error Handling - Divide by Zero
      if (char === '0' && eqn.charAt(i - 1) === '/') {
        errorMsg("Can't divide by zero. ");
        return "Can't divide by zero. ";
      }
      else if (wasDecimalFound) {
        // TODO
        numbers[operPos] += char;
      }
      // TODO: Add digit to end of number, if previous char was a number
      else if (numbers[operPos]) {
        numbers[operPos] += char;
      }
      // Or add it if it doesn't exist
      else {
        numbers.push(char);
      }
    }
    else if (isDecimal(char)) {
      // Continue looking for the rest of the decimal number
      wasDecimalFound = true;
      // Append decimal point to the number string
      numbers[operPos] += char;
      continue;
    }
    else {
      errorMsg('Unknown Error in splitEqn().');
      return '';
    }
  }
}

// Set equation to error message
// Dependencies: isErrorOngoing, error, TweenMax
function errorMsg(str: string = 'An unknown error occurred. Try again?') {
  isErrorOngoing = true;
  error.innerText = str;

  showError(error);

  // wait before auto-clearing,
  setTimeout(() => {
    if (isErrorOngoing) {
      hideError(error);
      isErrorOngoing = false;
    }
  }, 3000);
}

/*****
 * Handle User Input
 *****/

function onKeyDown(event: KeyboardEvent) {
  event.stopPropagation();
  const { key } = event;
  const keyBindings = {
      '/': '/',
      '*': '*',
      '-': '-',
      '+': '+',
      '=': '=',
      '.': '.',
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      'Backspace': 'backspace',
      'Enter': 'equals',
      'Clear': 'equals',
      ' ': 'equals',
      'Spacebar': 'equals'
  }

  if (key && keyBindings.hasOwnProperty(key)) {
      event.preventDefault();
      bttnHandler(keyBindings[key]);
  }
}
function onClick(event: MouseEvent) {
  event.stopPropagation();

  const { target: clickedEl } = event;
  var currentElemName = clickedEl.getAttribute('name');
  const buttonNames = {
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
      decimalPoint: '.',
      divide: '/',
      multiply: '*',
      subtract: '-',
      add: '+',
      equals: 'equals',
      clear: 'clear',
      percent: 'percent',
      squareRoot: 'sqrt',
      squared: 'squared',
      backspace: 'backspace'
  }

  // If a valid button (in buttonNames) was pressed, 
  if (buttonNames.hasOwnProperty(currentElemName)) {
      event.preventDefault();
      bttnHandler(buttonNames[currentElemName]);
  }
}
document.body.addEventListener('keydown', onKeyDown, false);
document.body.addEventListener('click', onClick, false);


/*****
 * EVENT LISTENERS
 *****/

const logo = document.getElementsByClassName('logo')[0]; // loading logo

// Scroll down on page load
window.addEventListener('load', () => TweenMax.to(window, 0.3, {delay: 1.5, scrollTo: window.innerHeight}), false);

// Click "Sexy Calc" logo to scroll down to calculator
logo.addEventListener('click', () => TweenMax.to(window, 0.3, {scrollTo: window.innerHeight}), false);


// moreBttns.addEventListener('click', function() {
//     //advanced to normal
//     if(normalBttns.style.left === 0) {
//       TweenMax.to(normalBttns, 0.3, {left: 0});
//       TweenMax.to(advancedBttns, 0.3, {left: 0}); 
//       TweenMax.to(moreBttns, 0.3, {left: 0, float: 'left'}); 
//     }
//     //normal to advanced
//     else {
//       TweenMax.to(normalBttns, 0.3, {left: 0});
//       TweenMax.to(advancedBttns, 0.3, {left: 0}); 
//       TweenMax.to(moreBttns, 0.3, {left: 0, float: 'left'}); 
//     }
// }, false);