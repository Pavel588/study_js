window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    const showHello = document.querySelector('.hello'),
        showDay = document.querySelector('.day'),
        showTime = document.querySelector('.time'),
        showDayLeft = document.querySelector('.dayLeft');
    
    const now = new Date(),
        hour = now.getHours(),
        time = now.toLocaleTimeString("en", { hour12: true }),
        day =  now.toLocaleString("ru", { weekday: "long" });

    function dayToNewYear () {
        const newYear = new Date(now.getFullYear() + 1, 0, 1);
        const daysLeft = String(Math.floor((newYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        const lastNumber = daysLeft[daysLeft.length - 1];
        let dayName;
        if (daysLeft > 4 && daysLeft < 21) {
            dayName = daysLeft + " дней";
        } else if (lastNumber == 1) {
            dayName = daysLeft + " день";
        } else if (lastNumber == 2 || lastNumber == 3 || lastNumber == 4) {
            dayName = daysLeft + " дня";
        } else {
            dayName = daysLeft + " дней";
        }
        return dayName;
    };

    const dayTime = hour => {
        let greeting;
        if (hour > 0 && hour < 6) {
            greeting = "Доброй ночи!";
        } else if (hour > 6 && hour < 12) {
            greeting = "Доброе утро!";
        } else if (hour > 12 && hour < 17) {
            greeting = "Добрый день!";
        } else {
            greeting = "Добрый вечер!";
        }
        return greeting;
    };

    showHello.textContent = dayTime(hour);
    showDay.textContent = `Сегодня: ${day[0].toUpperCase() + day.slice(1)}`;
    showTime.textContent = `Текущее время: ${time}`;
    showDayLeft.textContent = `До нового года осталось ${dayToNewYear()}`;


setInterval(showTime, 1000);    


});