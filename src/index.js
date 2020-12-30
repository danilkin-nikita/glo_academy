'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Таймер
countTimer('31 December 2020');

// Меню
toggleMenu();

//popup
togglePopUp();

//табы
tabs();

//слайдер
slider();

//Изменение img
changeImg();

//калькулятор
calc();

//send-ajax=form
sendForm();