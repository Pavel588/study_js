'use strict';
import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp'; 
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs'; 
import slider from './modules/slider'; 
import replacePhoto from './modules/replacePhoto'; 
import formValidation from './modules/formValidation'; 
import calc from './modules/calc'; 
import sendForm from './modules/sendForm';     

//Timer
countTimer('18 marth 2021')
// Меню
toggleMenu();
//popup
togglePopUp();
//Плавный скролл
smoothScroll();
//ТАбы
tabs();
//Слайдер
slider();
// Команда
replacePhoto();
//Валидация форм ввода 
formValidation();
//калькулятор
calc(100);
// send ajax form
sendForm();