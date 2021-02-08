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

const appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking() {
            const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            
            for (let i = 0; i < 2; i++) {
                let amount;
                let topExpenses = prompt('Введите обязательную статью расходов');    
                do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount));
                appData.expenses[topExpenses] = amount;
            }
    },
    
    getExpensesMonth() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        console.log("Расходы за месяц:", appData.expensesMonth);
        },
        
        
    
    getBudget() {
        appData.budgetMonth = appData.budget - appData.expensesMonth,
        appData.budgetDay = appData.budgetMonth / 30;
    },
    
    getTargetMonth() {
        const missionMonth = Math.ceil(appData.mission / appData.budgetMonth);
    if (missionMonth > 0) {
        return 'Цель будет достигнута за : ' + missionMonth + ' месяцa(-ев)';
    } else { 
        return 'Цель не будет достигнута';
    }
    },

    getStatusIncome() {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0 && appData.budgetDay <= 600) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay < 0) {
            console.log('Что-то пошло не так');
        }
    },
};



appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();

console.log(appData.budgetMonth);
console.log(appData.getTargetMonth());
console.log('Наша программа включает в себя данные: ');

for (let key in appData) {
    console.log(key, ' - ', appData[key]);
}