//TODO: Listen for keyboard events, Press corresponding button on keypress. 
//TODO: Add error handling. ex. can't do do 3**=43 or divide by zero. 
var equation = document.getElementById('equation');
var solution = document.getElementById('solution');

var previousOperator = '';
var previousNum = '';
var currentNum = '';

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isOperator(obj) {
  
}

function solve(1stNum, operator, 2ndnum) {
  return eval(1stnum + operator + 2ndnum);
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
	console.log("bttnHandler()");
	console.log(bttnVal);
	if (!isNaN(bttnVal)) {
		currentNum += bttnVal;
		solution.value = currentNum;
	} else if (bttnVal==='/'||bttnVal==='*'||bttnVal==='-'|| bttnVal==='+') {
        //Account for when there's no previous num. 
		if(previousNum && previousOperator) {
			solution.value = eval(previousNum + previousOperator + currentNum);
			currentNum = previousNum;
			previousOperator = bttnVal;
		}
        previousNum = currentNum;
        currentNum = '';
        equation.value += previousNum;
		equation.value += bttnVal;
        solution.value = eval(previousNum + previousOperator + currentNum);
	}else if(bttnVal==='.') {
		if(currentNum.indexOf('.') == -1) currentNum+=bttnVal;
		solution.value = currentNum;
	}else if(bttnVal==='clear') {
		currentNum = '';
		equation.value = '';
		solution.value = currentNum;
	}else if(bttnVal==='percent') {	
		currentNum *= 100;
		solution.value = currentNum;
	}else if(bttnVal==='sqrt') {
		currentNum = Math.sqrt(currentNum);
		solution.value=currentNum;
	}else if(bttnVal==='squared') {
		currentNum *= currentNum;
		solution.value = currentNum;
	} else if (bttnVal==='backspace') {
        currentNum = currentNum.slice(0, -1);  //Remove the last digit from currentNumk
        solution.value(currentNum);
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

	if(keyBindings.hasOwnProperty(event.key)) {
		currentNum += keyBindings[event.key];
        solution.value = event.key;
	}
}

//TODO: Make this work for backspace button
//Button Click Listener
document.getElementById('buttonsContainer').onclick = function(event) {
	
	var currentElemName = event.target.getAttribute('name');
	var buttonNames = {
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

    		//Add to end of currentNum. Only allow once per currentNum. 
    		decimalPoint: '.',

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
	if(buttonNames.hasOwnProperty(currentElemName)) {
		bttnHandler(buttonNames[currentElemName]);
	}
    event.stopPropagation();
}

//Append the value of whatever button is pressed to the equation. 

//When <input> button is pressed. Append the input.name to the equation. Set the currentNumber. rtyi 