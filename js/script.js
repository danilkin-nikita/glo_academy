window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const start = setInterval(() => updateClock(), 1000);

        const zeroFirstFormat = value => {
            if (value < 10) {
                value = '0' + value;
            }
            return value;
        };

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };

        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            timerHours.textContent = zeroFirstFormat(timer.hours);
            timerMinutes.textContent = zeroFirstFormat(timer.minutes);
            timerSeconds.textContent = zeroFirstFormat(timer.seconds);

            if (timer.timeRemaining === 0 || timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(start);
            }
        };
        updateClock();
    };

    countTimer('18 December 2020');

    //Плавный скролл
    const moveToAnchor = item => {

        const blockID = item.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // анимация появления
    const fade = (elem, num = 3) => {
        const start = Date.now();
        const timer = setInterval(() => {
            const timePassad = Date.now() - start;
            elem.style.opacity = timePassad / num + '%';
            if (elem.style.opacity >= 1) {
                clearInterval(timer);
            }
        });
        };  

    // Меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li>a'),
            anchorToService = document.querySelector('a[href$="service-block"]');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', event => {
            event.preventDefault();
            let target = event.target;

            if (menu.classList.contains('active-menu')) {
                if (!target.closest('.active-menu') || target.classList.contains('close-btn')) {
                    handlerMenu();
                } else if (target) {
                    menuItems.forEach(item => {
                        if (target === item) {
                            moveToAnchor(item);
                            handlerMenu();
                        }
                    });
                }      
            } else if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.closest('a[href$="service-block"]')) {
                moveToAnchor(anchorToService);
            }
        });
    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.opacity = 0;
                popup.style.display = 'block';
                if (screen.width > 768) {
                    fade(popup);
                }
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                    fade(tabContent[i], 8);
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;  

        for (let i = 0; i < slide.length; i++) {
            let dots = document.createElement('li');
            dots.className = 'dot';
            portfolioDots.append(dots);  
        }
        
        let dot = document.querySelectorAll('.dot');
        dot[0].className = 'dot dot-active';
        

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
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

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();

    };

    slider();

});
