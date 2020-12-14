window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  const currentDate = () => {
    const date = new Date(),
        currentHours = date.getHours(),
        currentTime = date.toLocaleTimeString(),
        currentDay = Math.floor(date / 60 / 60 / 24 / 1000);
    
    const NewYear = new Date('31 december 2020'),
          NewYearDay = Math.floor(NewYear / 60 / 60 / 24 / 1000);


    const bye2020 = () => {
      return NewYearDay - currentDay;
    };
    
      
    const currentDayOfWeek = () => {
      switch (date.getDay()) {
        case 0: return "Воскресенье";
        case 1: return "Понедельник";
        case 2: return "Вторник";
        case 3: return "Среда";
        case 4: return "Четверг";
        case 5: return "Пятница";
        case 6: return "Суббота";
      }    
    };

    const welcome = () => {
      if (currentHours >= 6 && currentHours <= 12) {
        return 'Доброе Утро!';
      } else if (currentHours > 12 && currentHours <= 18) {
        return 'Добрый день!';
      } else if (currentHours > 18 && currentHours <= 24) {
        return 'Добрый вечер!';
      } else if (currentHours === 24 || currentHours <= 6) {
        return 'Доброй ночи!';
      }
    };

    document.body.innerHTML = `<p>${welcome()}<br>
                                Сегодня: ${currentDayOfWeek()}<br>
                                Текущее время: ${currentTime} PM<br>
                                До нового года осталось ${bye2020()} дней</p>`;

  }; 
  
  setInterval(function() {
    currentDate();
  }, 1000);
 
});