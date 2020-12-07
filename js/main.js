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

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function() {

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    // appData.getInfoDeposit();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

  },
  check: function() {
     if (salaryAmount.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
  blocked: function() {
    document.querySelectorAll('input[type=text]').forEach(this.toggleItem);
    document.querySelectorAll('.btn_plus').forEach(this.toggleItem);

    start.style.display = 'none';
    cancel.style.display = 'block';
  },
  reset: function() {
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

    start.style.display = 'block';
    cancel.style.display = 'none';
  },
  toggleItem: function(item) {
     if (item.disabled === false) {
       item.disabled = true;
     } else if (item.disabled === true) {
       item.disabled = false;
     }
  },
  checkForNumber: function() {
    document.querySelectorAll('input[placeholder=Сумма]').forEach(function(item) {
      item.addEventListener('input', function() {
       if (item.value.match(/[^0-9]/g)) {
            item.value = item.value.replace(/[^0-9]/g, "");
        }
      });
    });
  },
  checkForString: function() {
    document.querySelectorAll('input[placeholder=Наименование]').forEach(function(item) {
      item.addEventListener('input', function() {
       if (item.value.match(/[^а-яА-Я\s]+/)) {
            item.value = item.value.replace(/[^?!,.а-яА-Я\s]+/, "");
        }
      });
    });
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', this.dynamicCalcPeriod);
  },
  addExpensesBlock: function() {
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
  },
  getExpenses: function() {
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
  },
  addIncomeBlock: function() {
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
  },
  getIncome: function() {
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
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  getBudget: function() {
    
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  
  },
  getTargetMonth: function() {
    return targetAmount.value / this.budgetMonth;
  },
  // getStatusIncome: function() {
  //   if (appData.budgetDay > 1200 ){
  //     return ('У вас высокий доход');
  //   } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200){
  //     return ('У вас средний уровень дохода');
  //   } else if (appData.budgetDay >= 0 && appData.budgetDay < 600){
  //     return ('К сожалению у вас уровень дохода ниже среднего');
  //   } else ('Что-то пошло не так');
  // },
  // getInfoDeposit: function() {
  //   appData.deposit = confirm('Есть ли у вас депозит в банке?');
  //   if (appData.deposit) {
  //     appData.percentDeposit = prompt('Какой годовой процент?', 10);
  //     while (!isNumber(appData.percentDeposit)) {
  //       appData.percentDeposit = prompt('Какой годовой процент?', 10);
  //     }

  //     appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
  //     while (!isNumber(appData.moneyDeposit)) {
  //       appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
  //     }
  //   }
  // },
  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },
  dynamicCalcPeriod: function() {
    incomePeriodValue.value = appData.calcPeriod();
  },
  checkPeriod: function() {
    periodAmount.innerHTML = periodSelect.value;
  }
};
periodSelect.addEventListener('input', function() {
  appData.checkPeriod();
});
start.disabled = true;
start.addEventListener('click', function() {
  appData.start();
});
start.addEventListener('click', function() {
  appData.blocked();
});
cancel.addEventListener('click', function() {
  appData.reset();
});
salaryAmount.addEventListener('input', function() {
  appData.check();
});
expensesAdd.addEventListener('click', function() {
  appData.addExpensesBlock();
});
incomeAdd.addEventListener('click', function() {
  appData.addIncomeBlock();
});
appData.checkForNumber();
appData.checkForString();

// console.log(`Расходы на месяц: ${appData.expensesMonth}`);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());

// let newArr = [];

// for (let item of appData.addExpenses) {
//   item = item[0].toUpperCase() + item.slice(1);
//   newArr.push(item);
// }
// console.log(newArr.join(', '));

// console.log('Наша программа включает в себя данные:');
// for (let key in appData){
//   console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
// }