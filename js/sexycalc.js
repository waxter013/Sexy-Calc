/** TODO: 
 *    - Listen for keyboard events, Press corresponding button on keypress. 
 *    - Add error handling. ex. can't do do 3**=43 or divide by zero. 
 */

//TODO: Delete when finished!
// Old Model
var previousNum = '',
    currentNum = '',
    previousOperator = '';

// View
var equation = document.getElementById('equation');
var solution = document.getElementById('solution');

// Model
var wasInputtingNum = false,
    firstNum, //The first number in a simple function, or the current number outside of a function. 
    secondNum; //The second number in a simple function, or null outside of a function. 

// Controller
function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


//TODO: Validation
//  First item must be a number
//  Disallow pressing two operators in a row
//  Disallow divide by zero
//
//TODO: Make it actually do the math
//TODO: Add handling for bttnVal==='backspace'
//TODO: Make it not ugly. Redesign the program (see notebook). 
function bttnHandler(bttnVal) {
    //Handle digits
    if (isNum(bttnVal)) {
        currentNum += bttnVal;
        solution.value = currentNum;
        wasInputtingNum = true;
    }
    //Handle simple functions
    else if (bttnVal === '/' || bttnVal === '*' || bttnVal === '-' || bttnVal === '+') {
        //After inputting 1st number
        if (wasInputtingNum) {
            equation.value += previousNum + bttnVal;
            solution.value = currentNum;
        }

        //When inputting 2nd number
        if (wasInputtingNum && currentNum) {
            if (bttnVal === '/') currentNum = previousNum / currentNum;
            else if (bttnVal === '*') currentNum = previousNum * currentNum;
            else if (bttnVal === '-') currentNum = previousNum - currentNum;
            else if (bttnVal === '+') currentNum = previousNum + currentNum;
            else console.log('Error!');
        }

        wasInputingNum = false;
    }
    //Handle modifier operations/special functions
    else if (bttnVal === '.') {
        if (currentNum.indexOf('.') == -1) currentNum += bttnVal;
        solution.value = currentNum;
    } else if (bttnVal === 'clear') {
        currentNum = '';
        equation.value = '';
        solution.value = currentNum;
    } else if (bttnVal === 'percent') {
        currentNum *= 100;
        solution.value = currentNum;
    } else if (bttnVal === 'sqrt') {
        currentNum = Math.sqrt(currentNum);
        solution.value = currentNum;
    } else if (bttnVal === 'squared') {
        currentNum *= currentNum;
        solution.value = currentNum;
    } else if (bttnVal === 'backspace') {
        currentNum = currentNum.slice(0, -1); //Remove the last digit from currentNumk
        solution.value = currentNum;
    }
}

//TODO: Fix keypress listener. Change from onkeypress to onkeydown. Adjust keybinding keys. 
//TODO: Change keybindings backspace key to ASCII value of backspace button. 
//Keypress Listener
document.body.onkeypress = function(event) {
    var keyBindings = {
        '/': bttnHandler('/'),
        '*': bttnHandler('*'),
        '-': bttnHandler('-'),
        '+': bttnHandler('+'),
        '=': bttnHandler('='),
        '.': bttnHandler('.'),
        0: bttnHandler('0'),
        1: bttnHandler('1'),
        2: bttnHandler('2'),
        3: bttnHandler('3'),
        4: bttnHandler('4'),
        5: bttnHandler('5'),
        6: bttnHandler('6'),
        7: bttnHandler('7'),
        8: bttnHandler('8'),
        9: bttnHandler('9'),
        backspace: bttnHandler('backspace')
    }

    if (keyBindings.hasOwnProperty(event.key)) {
        currentNum += keyBindings[event.key];
        solution.value = event.key;
    }
}

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
        equals: '=',

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

//When <input> button is pressed. Append the input.name to the equation. Set the currentNumber. 




//Terms: Digit, Number, special function(Math that modifies one value), simple function (math involving two values)

/*
  Press digit bttn, means starting a number. - isInputtingNum = false; append digit to previousNum; 
  Press special function (%, sqrt, ^2, clear, backspace, .) bttn, means ending a number and modifying it. 
  Press simple function (*, /, +, -) bttn, means ending a number,specifiying an operation,
  Press =, means end number. 

  ----------------------------------------------------------------------------------------------------
  1. Check what bttn was pressed

  2. bttnHandler(bttn)

  //Do this if a digit bttn was pressed
  else if(isInputingDigit)
    - Keep appending new digits to previousNum (Update Model)
    - Update UI
  
  //Do this if neither a digit bttn nor a special function bttn was pressed (aka if a simple function was pressed)
  else if(!isInputingDigit //&& is not a special function//): 
    - Figure out which simple function was pressed

    //Handle simple function pressed twice in a row
    if() {
  
    isInputingDigit = false; //Reset Values
    - Update UI: Backspace and give friendly error msg that goes away quickly. 
    }

    //Wait for 2nd number input
    if(secondNum) {
      - When done inputing 2nd num (!isInputingDigit again)
        - Do simple function between previousNum and currentNum
        //Reset Values
        firstNum = currentNum; 
        secondNum = null;
        - Update UI
    }

*/

function doMath() {
    // Handle special functions
    if (bttnVal === '.') {
        if (currentNum.indexOf('.') == -1) currentNum += bttnVal;
        solution.value = currentNum;
    } else if (bttnVal === 'clear') {
        currentNum = '';
        equation.value = '';
        solution.value = currentNum;
    } else if (bttnVal === 'percent') {
        currentNum *= 100;
        solution.value = currentNum;
    } else if (bttnVal === 'sqrt') {
        currentNum = Math.sqrt(currentNum);
        solution.value = currentNum;
    } else if (bttnVal === 'squared') {
        currentNum *= currentNum;
        solution.value = currentNum;
    } else if (bttnVal === 'backspace') {
        currentNum = currentNum.slice(0, -1); //Remove the last digit from currentNumk
        solution.value = currentNum;
    }
    /// Handle number input
    else if(isNum(bttnVal)) {

    }

}

// Updates (and validates) UI values
function updateUI(equation, solution, errorMsg) {
    //Valid Chars: numbers, /, *, +, -
    if (equationVal) {
        equation.value = equationVal;
    }
    //Valid Chars: numbers
    if (solutionVal) {
        solution.value = solutionVal;
    }
    if (errorMsg) {
        //Flash error msg on screen
        // - Option 1: Temporarily replace either, equation.value or solution.value, with an error message
        // - Option 2: Temporarily replace, #display div with an error message, 
        // - Option 3: Add an #error div behind #display div (in html). Hide #display div. Show #error div. 
    }
}