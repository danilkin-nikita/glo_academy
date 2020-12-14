window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    
    let start = setInterval(function() {
        updateClock();
    }, 1000);

    function zeroFirstFormat(value) {
      if (value < 10) {
        value = '0'+value;
      }
      return value;
    }

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 /60);
          return {timeRemaining, hours, minutes, seconds};

    }

    function updateClock() {
      let timer = getTimeRemaining();
    
      timerHours.textContent = zeroFirstFormat(timer.hours);
      timerMinutes.textContent = zeroFirstFormat(timer.minutes);
      timerSeconds.textContent = zeroFirstFormat(timer.seconds);

      if (timer.timeRemaining === 0 || timer.timeRemaining < 0) {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(start);
      }
    }
  }

  countTimer('15 December 2020');

});