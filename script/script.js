'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const buttonIncomeAdd = document.getElementsByTagName('button')[0];
const buttonExpensesAdd = document.getElementsByTagName('button')[1];
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const depositCheckbox = document.querySelector('#deposit-check');

const incomeInputOne = document.querySelectorAll('.additional_income-item')[0];
const iIncomeInputTwo = document.querySelectorAll('.additional_income-item')[1];

const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];


const salaryAmountInput = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
const expensesTitleInput = document.querySelector('input.expenses-title[placeholder="Наименование"]');
let expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


class AppData {
    constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
}
start() {
    if(salaryAmountInput.value === ''){
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        return;
    } else {this.budget = +salaryAmountInput.value;};

    
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getPeriod();

    this.showResult();
    this.blocked();
}
blocked() {
    document.querySelectorAll('.data input[type=text]').forEach(function(item){
        item.setAttribute('disabled', 'disabled');
    });
    buttonIncomeAdd.setAttribute('disabled', 'true');
    buttonExpensesAdd.setAttribute('disabled', 'true');    
    start.style.display = 'none';
    cancel.style.display = 'block';

}
reset() {
    let inputData = document.querySelectorAll('.data input[type=text]');
    let inputResult = document.querySelectorAll('.result input[type=text]');

    inputData.forEach(function(elem){
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    inputResult.forEach(function(elem) {
        elem.value = '';
    });
    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        buttonIncomeAdd.style.display = 'block';
    }
    for (let i = 1; i < expensesItems; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        buttonExpensesAdd.style.display = 'block';
    }
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    cancel.style.display = 'none';
    start.style.display = 'block';
    buttonIncomeAdd.removeAttribute('disabled');
    buttonExpensesAdd.removeAttribute('disabled');
    
}

showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
};
addExpensesBlock() {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        buttonExpensesAdd.style.display = 'none';
    }
};
addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        buttonIncomeAdd.style.display = 'none';
    } 
}

// AppData.prototype.getExpenses = function() {
//     const _this = this;
//     expensesItems.forEach(function(item){
//         const itemExpenses = item.querySelector('.expenses-title').value;
//         const cashExpenses = item.querySelector('.expenses-amount').value;
//         if (itemExpenses !== '' && cashExpenses !== ''){
//             _this.expenses[itemExpenses] = +cashExpenses;
//         }
//     });
// };
// AppData.prototype.getIncome = function() {
//     const _this = this;
//     incomeItems.forEach(function(item){
//         const itemIncome = item.querySelector('.income-title').value;
//         const cashIncome = item.querySelector('.income-amount').value;
//         if (itemIncome !== '' || cashIncome !== '') {
//             _this.income[itemIncome] = +cashIncome;
//         }
//     });
    
//     for (let key in _this.income) {
//         _this.incomeMonth += +_this.income[key];
//     }
// };
getExpInc() {
    
    const count = item => {
        const startStr = item.className.split('-')[0];
        
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== '' || itemAmount !== '') {
            this[startStr][itemTitle] = +itemAmount;
        }
    }

    incomeItems.forEach(count);
    expensesItems.forEach(count);
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
}
getAddExpenses() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });

}
getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
}
    
getExpensesMonth() {
    const _this = this;
    for (let key in _this.expenses) {
        _this.expensesMonth += +_this.expenses[key];
    }
}
    
    

getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth,
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
}

getTargetMonth() {
    const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth === Infinity || isNaN(missionMonth)) {
            return 'Цель не будет достигнута';
        } 
            return missionMonth;
}

getStatusIncome() {
    if (this.budgetDay >= 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay <= 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
        console.log('Что-то пошло не так');
    }
}

getInfoDeposit() {
    const _this = this;
    if(_this.deposit) {
        _this.percentDeposit = prompt('Какой годовой процент?', '10');
        while(!isNumber(_this.percentDeposit)) {
            _this.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        _this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while(!isNumber(_this.moneyDeposit)) {
            _this.moneyDeposit = prompt('Какой годовой процент?', '10');
        }
    }
}

getPeriod() {
    periodAmount.textContent = periodSelect.value;
    console.log(periodAmount);
}

calcPeriod() {
    return this.budgetMonth * periodSelect.value;
}

eventListeners() {
    cancel.addEventListener('click', this.reset.bind(this));
    start.addEventListener('click', this.start.bind(this));
    buttonExpensesAdd.addEventListener('click', this.addExpensesBlock);
    buttonIncomeAdd.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;
    });
}
}

const appData = new AppData();

appData.eventListeners();

