export const timer = deadline => {
  const timerCountDays = document.querySelector('.timer__count_days');
  const timerCountHours = document.querySelector('.timer__count_hours');
  const timerCountMinutes = document.querySelector('.timer__count_minutes');
  const timerUnitsDays = document.querySelector('.timer__units_days');
  const timerUnitsHours = document.querySelector('.timer__units_hours');
  const timerUnitsMinutes = document.querySelector('.timer__units_minutes');
  const heroTimer = document.querySelector('.hero__timer');
  const heroText = document.querySelector('.hero__text');

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    return {timeRemaining, minutes, hours, days};
  };

  const start = () => {
    const timer = getTimeRemaining();

    if (/[2-9][1]/.exec(timer.days) || timer.days === 1) {
      timerUnitsDays.textContent = 'день';
    } else if (timer.days <= 4 && timer.days > 1 ||
         (/[2-9][234]/.exec(timer.days))) {
      timerUnitsDays.textContent = 'дня';
    } else if (timer.days >= 5 || timer.days === 0) {
      timerUnitsDays.textContent = 'дней';
    }

    timerCountDays.textContent = timer.days;

    if (timer.hours === 21 || timer.hours === 1) {
      timerUnitsHours.textContent = 'час';
    } else if (/[02][234]/.exec(timer.hours)) {
      timerUnitsHours.textContent = 'часа';
    } else if (timer.hours >= 5 || timer.hours === 0) {
      timerUnitsHours.textContent = 'часов';
    }
    if (timer.hours < 10) {
      timerCountHours.textContent = '0' + timer.hours;
    } else {
      timerCountHours.textContent = timer.hours;
    }

    if (/[2-5][1]/.exec(timer.minutes) || timer.minutes === 1) {
      timerUnitsMinutes.textContent = 'минута';
    } else if (timer.minutes <= 4 && timer.minutes > 1 ||
         (/[2-5][234]/.exec(timer.minutes))) {
      timerUnitsMinutes.textContent = 'минуты';
    } else if (timer.minutes >= 5 || timer.minutes === 0) {
      timerUnitsMinutes.textContent = 'минут';
    }

    if (timer.minutes < 10) {
      timerCountMinutes.textContent = '0' + timer.minutes;
    } else {
      timerCountMinutes.textContent = timer.minutes;
    }

    const intervalId = setTimeout(start, 1000);
    if (timer.timeRemaining <= 0) {
      heroTimer.style.display = 'none';
      heroText.style.display = 'none';
      clearTimeout(intervalId);
    }
  };

  start();
};
