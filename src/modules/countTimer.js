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

export default countTimer;