'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      incomeAdd = document.getElementsByTagName('button')[0],
      expensesAdd = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      budgetDayValue = document.getElementsByClassName('result-total')[1],
      expensesMonthValue = document.getElementsByClassName('result-total')[2],
      additionalIncomeValue = document.getElementsByClassName('result-total')[3],
      additionalExpensesValue = document.getElementsByClassName('result-total')[4],
      incomePeriodValue = document.getElementsByClassName('result-total')[5],
      targetMonthValue = document.getElementsByClassName('result-total')[6],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      budgetMonthValue = document.querySelector('.budget_month-value');
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

start.disabled = true;

class AppData {

  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  check() {
     if (salaryAmount.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  }
  start() {
    this.budget = +salaryAmount.value;

    this.getExpInc();
    // this.getInfoDeposit();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  }
  blocked() {
    document.querySelectorAll('input[type=text]').forEach(this.toggleItem);
    document.querySelectorAll('.btn_plus').forEach(this.toggleItem);

    depositCheck.disabled = true;
    start.style.display = 'none';
    cancel.style.display = 'block';
  }
  reset() {
  document.querySelectorAll('input[type=text]').forEach(this.toggleItem);
    document.querySelectorAll('.btn_plus').forEach(this.toggleItem);
    document.querySelectorAll('input[type=text]').forEach((item) => {
      item.value = '';
    });

    this.budget = 0,
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.income = {},
    this.incomeMonth = 0,
    this.addIncome.length = 0,
    this.expenses = {},
    this.addExpenses.length = 0,
    this.expensesMonth = 0,
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0,

    start.disabled = true;
    start.style.display = 'block';
    cancel.style.display = 'none';
    depositCheck.checked = false;
    depositCheck.disabled = false;
    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;

    this.deleteIncomeBlock();
    this.deleteExpensesBlock();
  }
  toggleItem(item) {
     if (item.disabled === false) {
       item.disabled = true;
     } else if (item.disabled === true) {
       item.disabled = false;
     }
  }
  checkForNumber() {
    document.querySelectorAll('input[placeholder=Сумма]').forEach((item) => {
      item.addEventListener('input', function() {
       if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, "");
        }
      });
    });
  }
  checkForString() {
    document.querySelectorAll('input[placeholder=Наименование]').forEach((item) => {
      item.addEventListener('input', function() {
       if (this.value.match(/[^а-яА-Я\s]+/)) {
            this.value = this.value.replace(/[^?!,.а-яА-Я\s]+/, "");
        }
      });
    });
  }
  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = _this.calcPeriod();
    });
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }

    cloneExpensesItem.querySelectorAll('input').forEach(function(item) {
      item.value = '';
    });
    this.checkForNumber();
    this.checkForString();
  }
  deleteExpensesBlock() {
     for (let i = 0; i < expensesItems.length; i++) {
       if (i === 0) {
         continue;
       } else {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
       }
    }
      expensesAdd.style.display = 'block';
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 2) {
      incomeAdd.style.display = 'none';
    }

    cloneIncomeItem.querySelectorAll('input').forEach(function(item) {
      item.value = '';
    });
    this.checkForNumber();
    this.checkForString();
  }
  deleteIncomeBlock() {
   for (let i = 0; i < incomeItems.length; i++) {
       if (i === 0) {
         continue;
       } else {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
       }
    }
      incomeAdd.style.display = 'block';
  }
  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }

    for (const key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  eventsListeners() {
    periodSelect.addEventListener('input', () => {
      periodAmount.innerHTML = periodSelect.value;
    });
    start.addEventListener('click', this.start.bind(this));
    start.addEventListener('click', this.blocked.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    salaryAmount.addEventListener('input', this.check.bind(this));
    expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
    incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
    this.checkForNumber();
    this.checkForString();
  }
};

const appData = new AppData();

appData.eventsListeners();
