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

    countTimer('17 December 2020');

    // Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        const fade = elem => {
            const start = Date.now();
            const timer = setInterval(() => {
                const timePassad = Date.now() - start;
                elem.style.display = 'block';
                if (elem.style.opacity !== 0) {
                    elem.style.opacity = timePassad / 3 + '%';
                    if (elem.style.opacity >= 1) {
                        clearInterval(timer);
                    }
                }
            });
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (screen.width > 768) {
                    fade(popup);
                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            popup.style.opacity = '';
        });
    };

    togglePopUp();

    //Плавный скролл
    const smoothScroll = () => {
        const menuItems = document.querySelectorAll('a[href*="#"]');

        const moveToAnchor = item => {
            item.forEach(elem => {
                elem.addEventListener('click', event => {
                    event.preventDefault();

                    const blockID = elem.getAttribute('href').substr(1);

                    document.getElementById(blockID).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            });
        };
        moveToAnchor(menuItems);
    };
    smoothScroll();
});
