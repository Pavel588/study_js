const money = 42000;
const income = '10000';
const addExpenses = '600, 200, 6000';
const deposit = true;
const mission = 600000;
const period = 7;
const budgetDay = money / 30;

console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);