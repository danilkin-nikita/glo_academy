'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, продукты, такси');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 12;
let expenses = [];

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', 25000);
  }
  while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?', 'Такси');

    sum += +prompt('Во сколько это обойдется?', 2000);
    console.log('sas', sum);
    while (!isNumber(sum)) {
      sum = +prompt('Во сколько это обойдется?', 2000);
      console.log('asd', sum);
    }
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let budgetDay = accumulatedMonth / 30;

let getTargetMonth = function(){
  if (mission / accumulatedMonth > 0){
    return ('Цель будет достигнута');
  } else return ('Цель не будет достигнута');
};

let getStatusIncome = function(){
  if (budgetDay > 1200 ){
    return ('У вас высокий доход');
  } else if (budgetDay >= 600 && budgetDay <= 1200){
    return ('У вас средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 600){
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else return ('Что-то пошло не так');
};

console.log('Расходы за месяц:', expensesAmount);
console.log('Бюджет на месяц', getAccumulatedMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день', Math.floor(budgetDay));
console.log(getStatusIncome());