export function isNum(n: number) {
  return !isNaN(parseFloat(n.toString())) && isFinite(n);
}

export function isOperator(char: string) {
  return char === '*' || char === '/' || char === '+' || char === '-';
}

export function isDecimal(char: string) {
  return char === '.';
}

// // Count the number of operators in an equation string
// function numOps(eqn) {
//   var num = 0;
//   for(var i = 0, len = eqn.length; i < len; i++) {
//     if (isOperator(eqn.charAt(i))) {
//       num++;
//     }
//   }
//   return num;
// }