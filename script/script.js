'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
const start = function() {
    do {
        money = prompt('Ваш месячный доход');
    } while (!isNumber(money));
    
};

start();

const income = '10000';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses = [];
const mission = 600000;
const period = 7;


const showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(','));

const getExpensesMonth = function() {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
        let amount;
        expenses[i] = prompt('Введите обязательную статью расходов');    
        do {
            amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));
        sum += amount;
            
        
    }
    console.log(expenses);
    return sum;
};

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};
getAccumulatedMonth();

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    const missionMonth = mission / accumulatedMonth;
    if (missionMonth > 0) {
        return 'Цель будет достигнута за : ' + missionMonth;
    } else { 
        return 'Цель не будет достигнута';
    }

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



console.log(getAccumulatedMonth());
console.log(budgetDay);
console.log(getTargetMonth());