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
        updateClock();
        const interval = setInterval(updateClock, 1000);
    };
    
    countTimer('14 marth 2021')
    

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

    //Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dots = [];
        let currentSlide = 0,
        interval;
          /* Функция добавления точек по количеству слайдов */
        
        const slideDotAdd = () => {
            const slideDotWrap = document.querySelector('.portfolio-dots');
            for (let i = 0; i < slide.length; i++) {
                const dot = document.createElement('li');
                dot.classList.add('dot');
                dots.push(dot);
                slideDotWrap.appendChild(dot);
            }
        };
        slideDotAdd();
        
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };
        
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dots.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                })
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }

            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();

// Команда

    const replacePhoto = () => {
        const commandPhoto = document.getElementById('command');
        let base;
        
        commandPhoto.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.matches('img')) {
                base = target.src;
                target.src = target.dataset.img;
                target.dataset.img = base;
            }
            });
            commandPhoto.addEventListener('mouseout', event => {
            const target = event.target;
            if (target.matches('img')) {
                base = target.src;
                target.src = target.dataset.img;
                target.dataset.img = base;
            }
            });
    };
        
    replacePhoto();


//Валидация форм ввода 

    const formValidation = () => {
        const calcItems = document.querySelectorAll('.calc-item'),
            inputName = document.querySelectorAll('input[placeholder="Ваше имя"]'),
            inputEmail = document.querySelectorAll('input[type="email"]'),
            inputPhone = document.querySelectorAll('.form-phone'),
            inputMessage = document.querySelector('.mess');
            

        calcItems.forEach((item, index) => {
            item.addEventListener('input', () => {
                if (index === 0) {
                    return;
                }
                item.value = item.value.replace(/[^\d]/g, '');
            });
        });

        inputName.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-я\s]/gi, '').replace(/\s+/g, " ");
            });
        });

      
        inputMessage.addEventListener('input', () => {

            inputMessage.value = inputMessage.value.replace(/[^-а-я\s0-9.,?!]/gi, '').replace(/-+/g, '-');
        });
          
        inputEmail.forEach(item => {

            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '').replace(/-+/g, '-').replace(/^-|-$/g, ' ');
            });
        });
      
        inputPhone.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^+\d-()]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, ' ');
                if (item.value.length > 16) {
                    item.value = item.value.slice(0, 15);
                }
            });
        });
    };

    formValidation();

//калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
        countValue = 1,
        dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        
        if(calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if(typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        //Анимация total для калькулятора
        const animateCalc = ({timing, draw, duration}) => {

        let start = performance.now();
        
        requestAnimationFrame(function animate(time) {
            // timeFraction изменяется от 0 до 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
        
            // вычисление текущего состояния анимации
            let progress = timing(timeFraction);
        
            draw(progress); // отрисовать её
        
            if (timeFraction < 1) {
            requestAnimationFrame(animate);
            }
        
        });
        };
        animateCalc({

            duration: 1500,
            timing(timeFraction) {
            return timeFraction;
            },
            draw(progress) {
                totalValue.textContent = Math.floor(total * progress);
            }
        });

        totalValue.textContent = total;
    };        


    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if(target.matches('select') || target.matches('input')) {
            countSum();
        }

    })    
    };

    calc(100);

    // send ajax form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMesage = 'Спасибо! Мы скоро с вами свяжемся!';
        
        const form = document.getElementById('form1'),
            formModal = document.getElementById('form3'),
            formContact = document.getElementById('form2');
        
        const statusMesage = document.createElement('div');
        statusMesage.style.cssText = 'font-size 2rem;';

        const postData = body => new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.addEventListener("readystatechange", () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    resolve('Спасибо! Мы скоро с Вами свяжемся.');
                } else {
                    reject('Что-то пошло не так...');
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMesage);
            statusMesage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then(successMessage => {
                    statusMesage.textContent = successMessage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 5000);
                })
                .catch(errorMessage => {
                    statusMesage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 5000);
                });
            form.querySelectorAll('input').forEach((item) => {
                item.value = '';
            });

        });

        formModal.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMesage);
            statusMesage.textContent = loadMessage;
            const formData = new FormData(formModal);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then(successMessage => {
                    statusMesage.textContent = successMessage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 5000);
                })
                .catch(errorMessage => {
                    statusMesage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 5000);
                });

        });

        formContact.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMesage);
            statusMesage.textContent = loadMessage;
            const formData = new FormData(formContact);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then(successMessage => {
                    statusMesage.textContent = successMessage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 5000);
                })
                .catch(errorMessage => {
                    statusMesage.textContent = errorMessage;
                    setTimeout(() => {
                        statusMesage.textContent = '';
                    }, 5000);
                });
            formContact.querySelectorAll('input').forEach((item) => {
                item.value = '';
            });

        });

    };
    sendForm();

});