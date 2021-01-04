  const sendForm = () => {
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        statusMessage.style.color = '#fff';

        const inputError = elem => {
            elem.style.border = '3px solid red';
            setTimeout(() => {
                elem.style.border = 'none';
            }, 1500);
        };

        document.addEventListener('submit', event => {
            event.preventDefault();
            const target = event.target;

            const inputName = target.querySelector('input[name="user_name"]'),
                inputMessage = target.querySelector('input[name="user_message"]'),
                inputPhone = target.querySelector('input[name="user_phone"]'),
                inputEmail = target.querySelector('input[name="user_email"]');

            const validName = /^[а-яА-Я]{2,}$/,
                validMessage = /(^$)|^[?\!,.\-\а-яА-Я\d\s]+$/,
                validPhone = /^\+?[78]([-() ]*\d){10}$|^([-() ]*\d){7}$/,
                validEmai = /^\w+@\w+\.\w{2,}$/;

            let valid = true;

            if (target.matches('form')) {

                if (!inputName.value.match(validName)) {
                    inputError(inputName);
                    valid = false;
                }
                if (inputMessage) {
                    if (!inputMessage.value.match(validMessage)) {
                        inputError(inputMessage);
                        valid = false;
                    }
                }
                if (!inputPhone.value.match(validPhone)) {
                    inputError(inputPhone);
                    valid = false;
                }
                if (!inputEmail.value.match(validEmai)) {
                    inputError(inputEmail);
                    valid = false;
                }

                if (valid === false) {
                    return;
                }

                target.appendChild(statusMessage);
                statusMessage.innerHTML = `<img src="./images/loading.svg">`;

                const formData = new FormData(target);

                target.querySelectorAll('input').forEach(elem => {
                    elem.style.border = 'none';
                });
                target.reset();

                postData(formData)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error('status network not 200');
                        }
                        statusMessage.textContent = 'Спасибо! Мы скоро с вами свяжемся!';
                        setTimeout(() => {
                            statusMessage.remove();
                            document.querySelector('.popup').style.display = 'none';
                        }, 3000);  
                    })
                    .catch(error => {
                        statusMessage.textContent = 'Что-то пошло не так...';
                        console.error(error);
                        setTimeout(() => {
                            statusMessage.remove();
                            document.querySelector('.popup').style.display = 'none';
                        }, 3000);  
                    }); 
            }
        });

        const postData = formData => {
            return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/aplication/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        }; 

        document.addEventListener('change', event => {
            const target = event.target;

            if (target.matches('input[name="user_name"]')) {
                if (target.value.match(/^[а-яА-Я ]{2,}$/)) {
                    target.style.border = '3px solid green';
                } else {
                    target.style.border = 'none';
                }
            }
            if (target.matches('input[name="user_phone"]')) {
                if (target.value.match(/^\+?[78]([-() ]*\d){10}$|^([-() ]*\d){7}$/)) {
                    target.style.border = '3px solid green';
                } else {
                    target.style.border = 'none';
                }
            }
            if (target.matches('input[name="user_email"]')) {
                if (target.value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)) {
                    target.style.border = '3px solid green';
                } else {
                    target.style.border = 'none';
                }
            }
        });

        document.addEventListener('input', event => {
            const target = event.target;

            if (target.matches('input[name="user_name"]')) {
                target.value = target.value.replace(/[^а-яА-Я ]$/, '');
            }
            if (target.matches('input[name="user_message"]')) {
                target.value = target.value.replace(/[^а-яА-Я0-9\@\-\.!?,_ ]$/, '');
            }
            if (target.matches('input[name="user_phone"]')) {
                target.value = target.value.replace(/[^+\-\)\(0-9 ]$/, '');
            }
            if (target.matches('input[name="user_email"]')) {
                target.value = target.value.replace(/[^a-z0-9@.-_]$/, '');
            }
        });
    };

    export default sendForm;