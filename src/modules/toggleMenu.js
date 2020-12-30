const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li>a'),
            anchorToService = document.querySelector('a[href$="service-block"]');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', event => {
            const target = event.target;

            if (menu.classList.contains('active-menu')) {
                if (!target.closest('.active-menu') || target.classList.contains('close-btn')) {
                    handlerMenu();
                } else if (target) {
                    menuItems.forEach(item => {
                        if (target === item) {
                            event.preventDefault();
                            moveToAnchor(item);
                            handlerMenu();
                        }
                    });
                }
            } else if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.closest('a[href$="service-block"]')) {
                event.preventDefault();
                moveToAnchor(anchorToService);
            }
        });
        
        const moveToAnchor = item => {

        const blockID = item.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    };

    export default toggleMenu;