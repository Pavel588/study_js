window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    //Timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),   
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60) % 24;
                 // const days = Math.floor(timeRemaining / 60 / 60 / 24);
                return {timeRemaining, hours, minutes, seconds};
        }
        
        const addZero = value => {
            if (value < 10) {
                value = '0' + value;
                return value;
            }
            return value;
        };

        
        const updateClock = () => {
            let timer = getTimeRemaining();
            
            if (timer.timeRemaining > 0) {
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            } else if (timer.timeRemaining < 0 ) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                clearInterval(interval);
            }
        };
        const interval = setInterval(updateClock, 1000);
    };

    countTimer('08 marth 2021')
    

    // Меню
    const toggleMenu = () => {

        const menu = document.querySelector('menu');
        const btnMenu = document.querySelector('.menu');    
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        }; 
        btnMenu.addEventListener('click', handlerMenu);   
        menu.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.classList.contains('close-btn') || target.closest('.menu') || target.matches('menu>ul>li>a')){
                handlerMenu();
            } 
        })
    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');
        

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth > 768) {
                    popup.style.display = "block";
                    popup.style.opacity = "0%";
                    let counter = 0;
                    const popupFadeIn = () => {
                        if (counter < 100) {
                            ++counter;
                            popup.style.opacity = counter + "%";
                        } else {
                            clearInterval(timer);
                        }
                    };
                    const timer = setInterval(popupFadeIn, 7);
                } else {
                    popup.style.display = "block";
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else { 
                target = target.closest('.popup-content');
                
                if(!target){
                    popup.style.display = 'none';
                }
            }
        });

        

    };
    togglePopUp();

    //ТАбы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }

            }
        };    
            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab');
               
                if(target){
                    tab.forEach((item, i) => {
                        if(item === target){
                            toggleTabContent(i);
                        }    
                    });
                }
                
            });
    };
    tabs();







});