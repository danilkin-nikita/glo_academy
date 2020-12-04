'use strict';

let start = document.getElementById('start');
let reset = document.getElementById('cancel');
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

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    // appData.getInfoDeposit();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();

  },
  check: function() {
     if (salaryAmount.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      } 
    });
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 2) {
      incomeAdd.style.display = 'none';
    }
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      let itetValue = item.value.trim();
      if (itetValue !== '') {
        appData.addIncome.push(itetValue);
      }
    });
  },
  getExpensesMonth: function() {

    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function() {
    
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  
  },
  getTargetMonth: function() {
    return targetAmount.value / appData.budgetMonth;
  },
  getStatusIncome: function() {
    if (appData.budgetDay > 1200 ){
      return ('У вас высокий доход');
    } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200){
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else ('Что-то пошло не так');
  },
  getInfoDeposit: function() {
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if (appData.deposit) {
      appData.percentDeposit = prompt('Какой годовой процент?', 10);
      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }

      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
    }
  },
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  }
};
periodSelect.oninput = function() {
  periodAmount.innerHTML = periodSelect.value;
};
start.disabled = true;
start.addEventListener('click', appData.start);
salaryAmount.addEventListener('input', appData.check);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);

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