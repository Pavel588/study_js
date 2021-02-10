'use strict';

const buttonCalculate = document.getElementById('start');

const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];

const depositCheckbox = document.querySelector('#deposit-check');

const incomeInputOne = document.querySelectorAll('.additional_income-item')[0];
const iIncomeInputTwo = document.querySelectorAll('.additional_income-item')[1];

const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

console.log(document.getElementsByClassName('target_month-value')[0]);

const salaryAmountInput = document.querySelector('.salary-amount');
const incomeTitleInput = document.querySelector('input.income-title[placeholder="Наименование"]');
const incomeAmountInput = document.querySelector('input.income-amount[placeholder="Сумма"]');
console.log(document.querySelector('.income-title'));
const expensesTitleInput = document.querySelector('input.expenses-title[placeholder="Наименование"]');
const expensesAmountInput = document.querySelector('input.expenses-amount[placeholder="Сумма"]');
const additionalExpensesInput = document.querySelector('.additional_expenses-item');
const targetAmountInput = document.querySelector('.target-amount');
const periodRangeInput = document.querySelector('.period-select');


const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money;
const start = function() {
    do {
        money = prompt('Ваш месячный доход', 50000);
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking() {
        
        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
            while(isFinite(itemIncome) || itemIncome === null) {
                itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
            }

            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while(!isNumber(cashIncome)) {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }

            appData.income[itemIncome] = +cashIncome;
        }    

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, спортзал, хобби');
        while(isFinite(addExpenses) || addExpenses === null) {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, спортзал, хобби');
        }
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
            
        for (let i = 0; i < 2; i++) {
            let amount;
            let topExpenses = prompt('Введите обязательную статью расходов');
            while(isFinite(topExpenses) || topExpenses === null) {
                topExpenses = prompt('Введите обязательную статью расходов');
            }    
                do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount));
            appData.expenses[topExpenses] = +amount;
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
    
    getInfoDeposit() {
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while(!isNumber(appData.percentDeposit)) {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while(!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = prompt('Какой годовой процент?', '10');
            }
        }
    },
    
    calcSavedMoney() {
        return appData.budgetMonth * appData.period;
    }
};



appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth(); 
appData.getInfoDeposit();
appData.getStatusIncome();
appData.calcSavedMoney();


console.log(appData.budgetMonth);
console.log(appData.getTargetMonth());
console.log('Наша программа включает в себя данные: ');

for (let key in appData) {
    console.log(key, ' - ', appData[key]);
}


let array = appData.addExpenses.join(', ');
    console.log(array.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
        );





