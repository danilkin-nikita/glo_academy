'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

let start = function() {
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
  expensesMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, продукты, такси');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {

     let name = prompt('Введите обязательную статью расходов?', 'Такси');

     let cost = prompt('Во сколько это обойдется?', 2000);

     while (!isNumber(cost)) {
        cost = prompt('Во сколько это обойдется?', 2000);
      }

     appData.expenses[name] = cost;
     
    }
  },
  getExpensesMonth: function() {

    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function() {
    
    appData.budgetMonth = appData.budget - appData.getExpensesMonth();
    appData.budgetDay = appData.budgetMonth / 30;
  
  },
  getTargetMonth: function() {
    if (appData.mission / appData.budgetMonth > 0) {
      return ('Цель будет достигнута');
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
  }
};

appData.asking();

console.log('Расходы за месяц:', appData.getExpensesMonth());
console.log('Бюджет на месяц', appData.budgetMonth);
console.log(appData.getTargetMonth());
console.log('Бюджет на день', Math.floor(appData.budgetDay));
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData){
  console.log(key + appData[key]);
}