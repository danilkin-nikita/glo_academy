'use strict';

const calculation = document.getElementById('start');
const reset = document.getElementById('cancel');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetDayValue = document.getElementsByClassName('result-total')[1];
const expensesMonthValue = document.getElementsByClassName('result-total')[2];
const additionalIncomeValue = document.getElementsByClassName('result-total')[3];
const additionalExpensesValue = document.getElementsByClassName('result-total')[4];
const incomePeriodValue = document.getElementsByClassName('result-total')[5];
const targetMonthValue = document.getElementsByClassName('result-total')[6];
const salaryAmount = document.querySelector('.salary-amount');
const incomeItems = document.querySelector('.income-items');
const incomeTitle = incomeItems.querySelector('.income-title');
const incomeValue = incomeItems.querySelector('.income-amount');
const expensesItems = document.querySelector('.expenses-items')
const expensesTitle = expensesItems.querySelector('.expenses-title');
const expensesValue = expensesItems.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetValue = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const budgetMonthValue = document.querySelector('.budget_month-value');

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const isString = function(n) {
  return isNaN(n)
};

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?', 25000);
  }
  while (!isNumber(money));
};

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function() {

    if(confirm('Есть ли у вас допольнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас есть дополнительный заработотк?', 'Таксую');
      while (!isString(itemIncome)) {
        itemIncome = prompt('Какой у вас есть дополнительный заработотк?', 'Таксую');
      }

      let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      while (!isNumber(cashIncome)) {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, продукты, такси');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
       
    for (let i = 0; i < 2; i++) {

     let itemExpenses = prompt('Введите обязательную статью расходов?', 'Такси');
     while (!isString(itemExpenses)) {
       itemExpenses = prompt('Введите обязательную статью расходов?', 'Такси');
     }

     let cashExpenses = prompt('Во сколько это обойдется?', 2000);

     while (!isNumber(cashExpenses)) {
        cashExpenses = prompt('Во сколько это обойдется?', 2000);
      }

     appData.expenses[itemExpenses] = cashExpenses;
     
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function() {

    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function() {
    
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  
  },
  getTargetMonth: function() {
    appData.mission = appData.mission / appData.budgetMonth;
    if (appData.mission > 0) {
      return (`Цель будет достигнута за ${Math.ceil(appData.mission)} месяца`);
    } else return ('Цель не будет достигнута');

  },
  getStatusIncome: function() {
    if (appData.budgetDay > 1200 ){
      return ('У вас высокий доход');
    } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200){
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600){
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else return ('Что-то пошло не так');
  },
  getInfoDeposit: function() {
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
  calcSavedMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log(`Расходы на месяц: ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

let newArr = [];

for (let item of appData.addExpenses) {
  item = item[0].toUpperCase() + item.slice(1);
  newArr.push(item);
}
console.log(newArr.join(', '));

console.log('Наша программа включает в себя данные:');
for (let key in appData){
  console.log('Ключ: ' + key + ' Значение: ' + appData[key]);
}