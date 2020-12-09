'use strict';

let start = document.getElementById('start');
let cancel = document.getElementById('cancel');
let incomeAdd = document.getElementsByTagName('button')[0];
let expensesAdd = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetDayValue = document.getElementsByClassName('result-total')[1];
let expensesMonthValue = document.getElementsByClassName('result-total')[2];
let additionalIncomeValue = document.getElementsByClassName('result-total')[3];
let additionalExpensesValue = document.getElementsByClassName('result-total')[4];
let incomePeriodValue = document.getElementsByClassName('result-total')[5];
let targetMonthValue = document.getElementsByClassName('result-total')[6];
let salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let incomeAmount = document.querySelector('.income-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount')
let budgetMonthValue = document.querySelector('.budget_month-value');

start.disabled = true;

const AppData = function () {

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

};

AppData.prototype.check = function() {
     if (salaryAmount.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
};

AppData.prototype.start = function() {

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    // this.getInfoDeposit();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

};

AppData.prototype.blocked = function() {
    document.querySelectorAll('input[type=text]').forEach(this.toggleItem);
    document.querySelectorAll('.btn_plus').forEach(this.toggleItem);

    depositCheck.disabled = true;
    start.style.display = 'none';
    cancel.style.display = 'block';
  };

AppData.prototype.reset = function() {

  document.querySelectorAll('input[type=text]').forEach(this.toggleItem);
    document.querySelectorAll('.btn_plus').forEach(this.toggleItem);
    document.querySelectorAll('input[type=text]').forEach(function(item) {
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
  };  

  AppData.prototype.toggleItem = function(item) {
     if (item.disabled === false) {
       item.disabled = true;
     } else if (item.disabled === true) {
       item.disabled = false;
     }
  };

  AppData.prototype.checkForNumber = function() {
    document.querySelectorAll('input[placeholder=Сумма]').forEach(function(item) {
      item.addEventListener('input', function() {
       if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, "");
        }
      });
    });
  };

  AppData.prototype.checkForString = function() {
    document.querySelectorAll('input[placeholder=Наименование]').forEach(function(item) {
      item.addEventListener('input', function() {
       if (this.value.match(/[^а-яА-Я\s]+/)) {
            this.value = this.value.replace(/[^?!,.а-яА-Я\s]+/, "");
        }
      });
    });
  };

  AppData.prototype.showResult = function() {
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
  };

  AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
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
  };

  AppData.prototype.deleteExpensesBlock = function() {
     for (let i = 0; i < expensesItems.length; i++) {
       if (i === 0) {
         continue;
       } else {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
       }
    }
      expensesAdd.style.display = 'block';
  };

  AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    }, this);

    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  };

  AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
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
  };

  AppData.prototype.deleteIncomeBlock = function() {
   for (let i = 0; i < incomeItems.length; i++) {
       if (i === 0) {
         continue;
       } else {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
       }
    }
      incomeAdd.style.display = 'block';
  };

  AppData.prototype.getIncome = function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    }, this);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };

  AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  };

  AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  };

  AppData.prototype.getBudget = function() {
    
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  
  };

  AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
  };
  // getStatusIncome: function() {
  //   if (this.budgetDay > 1200 ){
  //     return ('У вас высокий доход');
  //   } else if (this.budgetDay >= 600 && this.budgetDay <= 1200){
  //     return ('У вас средний уровень дохода');
  //   } else if (this.budgetDay >= 0 && this.budgetDay < 600){
  //     return ('К сожалению у вас уровень дохода ниже среднего');
  //   } else ('Что-то пошло не так');
  // },
  // getInfoDeposit: function() {
  //   this.deposit = confirm('Есть ли у вас депозит в банке?');
  //   if (this.deposit) {
  //     this.percentDeposit = prompt('Какой годовой процент?', 10);
  //     this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
  //   }
  // },
  AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
  };

  AppData.prototype.eventsListeners = function() {
    periodSelect.addEventListener('input', function() {
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
  };

const appData = new AppData();

appData.eventsListeners();
