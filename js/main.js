'use strict';

let money = +prompt('Ваш месячный доход?', 25000);
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, продукты, такси');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 12;
let expenses1 = prompt('Введите обязательную статью расходов?', 'Такси');
let amount1 = +prompt('Во сколько это обойдется?', 2500);
let expenses2 = prompt('Введите еще одну обязательную статью расходов?', 'Коммунальные платежи');
let amount2 = +prompt('Во сколько это обойдется?', 3000);
let accumulatedMonth = getAccumulatedMonth();
let budgetDay = accumulatedMonth / 30;

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
  return amount1 + amount2;
};

function getAccumulatedMonth() {
  return money - (amount1 + amount2);
};

function getTargetMonth(){
  return Math.ceil(mission / accumulatedMonth);
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

console.log('Расходы за месяц:', getExpensesMonth());
console.log('Бюджет на месяц', getAccumulatedMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за', getTargetMonth(), 'месяцев');
console.log('Бюджет на день', Math.floor(budgetDay));
console.log(getStatusIncome());