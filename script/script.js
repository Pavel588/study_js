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
const depositCheck = document.getElementById('deposit-check');
const periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
const inputName = document.querySelectorAll('input[placeholder="Наименование"]');

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
    if(depositCheckbox.checked && (depositBank.value === '' || depositAmount.value === '' || !isFinite(depositAmount.value) || depositPercent.value === '') ) {
        return;
    } 
    
    if(salaryAmountInput.value === ''){
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        return;
    } else {this.budget = +salaryAmountInput.value;};

    
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
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
    depositBank.setAttribute('disabled', 'true');
    depositCheckbox.setAttribute('disabled', 'true');
    depositPercent.removeEventListener('input', appData.validatorPercent);

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
    depositCheckbox.checked = false;
    depositPercent.style.display = 'none';
    depositBank.removeAttribute('disabled');
    depositCheckbox.removeAttribute('disabled');
    this.depositHandler();
    
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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit,
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
}

getTargetMonth() {
    const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth === Infinity || isNaN(missionMonth)) {
            return 'Цель не будет достигнута';
        } 
            return missionMonth;
}

getInfoDeposit() {
    if(this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
}

getPeriod() {
    periodAmount.textContent = periodSelect.value;
    
}

calcPeriod() {
    return this.budgetMonth * periodSelect.value;
}
validatorPercent() {
    if (!isFinite(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100) {
        alert('Укажите корректное значение');
        depositPercent.value = '0';
        start.setAttribute('disabled', 'true');
    } else {
        start.removeAttribute('disabled');
    }
}
changePercent(){
    const valueSelect = this.value;
    if (valueSelect === 'other') {
        depositPercent.style.display = 'inline-block';
        depositPercent.value = '';
        this.percentDeposit = depositPercent.value;
        
    } else {
        start.removeAttribute('disabled');
        depositPercent.value = valueSelect;
        depositPercent.style.display = 'inline-block';
        
    }
}

depositHandler() {
    if (depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.changePercent);
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
    }
}

checkInputValues() {
    inputSum.forEach((item) => {
      item.addEventListener('input',() => {
        item.value = item.value.replace(/[^\d]/g, '');
      });
    });

    inputName.forEach((item) => {
      item.addEventListener('input',() => {
        item.value = item.value.replace(/[^?!,.а-яА-ЯёЁ\s]/g, '');
      });
    });
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
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('input', appData.validatorPercent);
}
}

const appData = new AppData();

appData.eventListeners();
appData.checkInputValues();

