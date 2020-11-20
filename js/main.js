let money = 500;
let income = 'фриланс';
let addExpenses = 'интернет, такси, налоги';
let deposit = true;
let mission = 1000000;
let period = 12;
let budgetDay = money / 30;

console.log(typeof(money), typeof(income), typeof(deposit));
console.log('Длина строки addExpenses =', addExpenses.length);
console.log('Период равен', period, 'месяцев', '\nЦель заработать', mission, 'долларов');
console.log(addExpenses.toUpperCase().split(', '));
console.log('Доход за день', budgetDay);