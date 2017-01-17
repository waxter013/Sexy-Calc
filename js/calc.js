//Solves an equation string, which is simply a lot of simple operations in one string
function solve(nums, ops) {
  // '3*4-5/2' = '12-5/2' = '7/2' = 3.5
  //
  // [3, 4, 5, 2] - [0, 1, 2, 3]
  // [*, -, /]    - [0, 1, 2]
  var subResult; //Store the result of the previous Simple Operation

  subResult = solveSimple(nums[0], ops[0], nums[1]);
  for(var i = 1, len = operators.length; i < len; i++) {
    subResult = solveSimple(subResult, ops[i], nums[i+1]);
  }
  return subResult;
}


function solveSimple(num1, oper, num2) {
  // if there's no second number, return empty string
  if(!num2)
    return '';
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

//Separates equation into numbers and operators
function splitEqn(eqn) {
  numbers = [];
  operators = [];

  //Check that first char is number, else error
  if(isOperator(eqn.charAt(0))) {
    errorMsg("Must start with an operator");
    return 'started with operator';
  }
  for(var i = 0, len = eqn.length, char = ''; i < len; i++) {
    char = eqn.charAt(i); //Cache current char

    //Handle Nums
    if (isNum(char))
      //Logical Error Handling - Divide by Zero
      if(char === '0' && eqn.charAt(i-1) === '/') {
        errorMsg("Can't divide by zero. ");
        return "Can't divide by zero. ";
      }
      //Create value if it doesn't exist
      else if(!numbers[i])
        numbers.push(char);
      //Or just add to it
      else
        numbers[i] += char;

    //Handle Operators
    else if (isOperator(char)) {
      //Logical Error Handling - Operation on an operation
      if(isOperator(eqn.charAt(i-1))) {
        errorMsg("Can't do two operators in a row. ");
        return "Can't do two operators in a row. ";
      }
      //If Error Free: Add operator to operators
      operators.push(char);
    }
    else {
      errorMsg('Unknown Error. Please contact my creator: deep@deepduggal.me');
      return 'unknown error';
    }
  }
  console.log('numbers: ' + numbers);
  console.log('operators: ' + operators);
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
  setSolution(tempSolution);
}