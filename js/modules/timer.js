function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / 1000 / 60 / 60 / 24),
        hours = Math.floor((t / 1000 / 60 / 60) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
        
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'total': total
        }
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else return num;
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
        updateClock();
        
        function updateClock() {
            const ms = getTimeRemaining(endtime);
            days.innerHTML = getZero(ms.days);
            hours.innerHTML = getZero(ms.hours);
            minutes.innerHTML = getZero(ms.minutes);
            seconds.innerHTML = getZero(ms.seconds);
            if (ms.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    
    
    };

setClock(id, deadline);

}

export default timer;
