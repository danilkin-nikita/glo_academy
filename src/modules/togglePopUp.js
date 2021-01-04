 const togglePopUp = () => {
        const popup = document.querySelector('.popup');

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

        document.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-btn')) {
                popup.style.display = 'block';
                if (screen.width > 768) {
                    popup.style.opacity = 0;
                    fade(popup);
                }
            }
            if (target.closest('.popup')) {
                if (target.classList.contains('popup-close')) {
                    popup.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');

                    if (!target) {
                        popup.style.display = 'none';
                    }
                }
            }
        });
    };
    
    export default togglePopUp;