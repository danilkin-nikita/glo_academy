'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 12;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите еще одну обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = money - (amount1 + amount2);
let budgetDay = budgetMonth / 30;



console.log(typeof(money), typeof(income), typeof(deposit));
console.log('Длина строки addExpenses =', addExpenses.length);
console.log('Период равен', period, 'месяцев', '\nЦель заработать', mission, 'долларов');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц', budgetMonth);
console.log('Цель будет достигнута за', Math.ceil(mission / budgetMonth), 'месяцев');
console.log('Бюджет на день', Math.floor(budgetDay));

if (budgetDay > 1200 ){
  console.log('У вас высокий доход');
} else if (budgetDay >= 600 && budgetDay <= 1200){
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0 && budgetDay < 600){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else console.log('Что-то пошло не так');
