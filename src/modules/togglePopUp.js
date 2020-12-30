 const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

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
    
    export default togglePopUp;