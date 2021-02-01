const money = 42000;
let income = '10000';
let addExpenses = '600, 200, 6000';
let deposit = true;
let mission = 600000;
let period = 7;
let budgetDay = money / 30;

console.log(typeof money, income, deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(budgetDay);