'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      incomeAdd = document.getElementsByTagName('button')[0],
      expensesAdd = document.getElementsByTagName('button')[1],
      depositCheck = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
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
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }
  blocked() {
    document.querySelectorAll('input[type=text]').forEach(this.toggleItem);
    document.querySelectorAll('.btn_plus').forEach(this.toggleItem);

    depositCheck.disabled = true;
    depositBank.disabled = true;
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
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositCheck.checked = false;
    depositCheck.disabled = false;
    depositBank.disabled = false;
    periodSelect.value = 1;
    periodAmount.innerHTML = periodSelect.value;
    depositBank.value = '';
    depositAmount.value = '';
    depositPercent.value = '';
      
    depositBank.removeEventListener('change', this.changePercent);

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
  checkForPercent() {
    depositPercent.addEventListener('input', function() {
      if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, "");
      } else if (this.value.length > 3 || this.value > 100) {
        this.value = '';
      }
    });
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      depositPercent.value = '';
    } else if (valueSelect === '') {
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
    } else {
      depositAmount.style.display = 'inline-block';
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventsListeners() {
    periodSelect.addEventListener('input', () => {
      periodAmount.innerHTML = periodSelect.value;
      incomePeriodValue.value = this.calcPeriod();
    });
    start.addEventListener('click', this.start.bind(this));
    start.addEventListener('click', this.blocked.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    salaryAmount.addEventListener('input', this.check.bind(this));
    expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
    incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));

    this.checkForNumber();
    this.checkForString();
    this.checkForPercent();
  }
};

const appData = new AppData();

appData.eventsListeners();
