const countTimer = (deadline) => {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
        
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),   
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60) % 24;
             // const days = Math.floor(timeRemaining / 60 / 60 / 24);
            return {timeRemaining, hours, minutes, seconds};
    }
    
    const addZero = value => {
        if (value < 10) {
            value = '0' + value;
            return value;
        }
        return value;
    };

    
    const updateClock = () => {
        let timer = getTimeRemaining();
        
        if (timer.timeRemaining > 0) {
        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
        } else if (timer.timeRemaining < 0 ) {
            timerHours.style.color = 'red';
            timerHours.textContent = '00';
            timerMinutes.style.color = 'red';
            timerMinutes.textContent = '00';
            timerSeconds.style.color = 'red';
            timerSeconds.textContent = '00';
        } else {
            clearInterval(interval);
        }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
};
export default countTimer;