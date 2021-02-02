'use strict';

const money = +prompt('Ваш месячный доход?');
const income = '10000';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов');
const amount1 = +prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов');
const amount2 = +prompt('Во сколько это обойдется?');
const mission = 600000;
const period = 7;


const showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const getExpensesMonth = function() {
    return amount1 + amount2;
};
getExpensesMonth();

console.log(addExpenses.toLowerCase().split(','));

const getAccumulatedMonth = function() {
    return money - getExpensesMonth();
};
getAccumulatedMonth();

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    return mission / accumulatedMonth;
};
getTargetMonth();

const budgetDay = accumulatedMonth / 30;

const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay >= 0 && budgetDay <= 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
        console.log('Что-то пошло не так');
    }
};
getStatusIncome();


console.log(getExpensesMonth());
console.log(getAccumulatedMonth());
console.log(budgetDay);
console.log(getTargetMonth());