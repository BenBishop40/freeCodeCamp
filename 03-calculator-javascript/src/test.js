const display = [9, 8, 7, "*", 8, 7, 5, "+", 9, 8];
const expression = display.join('');
const result = eval(expression);

console.log("Résultat :", result);