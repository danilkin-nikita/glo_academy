'use strict';

const book = document.querySelectorAll('.book');
const title = document.querySelectorAll('a');
const body = document.querySelector('body');
const adv = document.querySelector('.adv');
const chaptersOfTheSecondBook = book[0].querySelectorAll('li');
const chaptersOfTheFifthBook = book[5].querySelectorAll('li');
const chaptersOfTheSixthBook = book[2].querySelectorAll('li');

const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

book[0].before(book[1]);
book[2].before(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

title[4].textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

chaptersOfTheFifthBook[2].before(chaptersOfTheFifthBook[9]);
chaptersOfTheFifthBook[5].before(chaptersOfTheFifthBook[2]);
chaptersOfTheFifthBook[7].after(chaptersOfTheFifthBook[5]);

chaptersOfTheSecondBook[9].after(chaptersOfTheSecondBook[2]);
chaptersOfTheSecondBook[3].after(chaptersOfTheSecondBook[6]);
chaptersOfTheSecondBook[4].before(chaptersOfTheSecondBook[8]);

chaptersOfTheSixthBook[8].insertAdjacentElement('afterend', newElem);


