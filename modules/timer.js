
const skl = (num, titles) => {
  const suffix = titles[
    num % 10 === 1 && num % 100 !== 11 ? 0 :
     num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 ||
       num % 100 >= 20) ? 1 : 2];
  return (suffix);
};

const plusZero = (num) => {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
};
export const timer = deadline => {
  const a = ['минута', 'минуты', 'минут'];
  const b = ['день', 'дня', 'дней'];
  const c = ['час', 'часа', 'часов'];
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

    timerCountDays.textContent = timer.days;
    timerUnitsDays.textContent = skl(timer.days, b);

    timerUnitsHours.textContent = skl(timer.hours, c);
    timerCountHours.textContent = plusZero(timer.hours);

    timerUnitsMinutes.textContent = skl(timer.minutes, a);
    timerCountMinutes.textContent = plusZero(timer.minutes);

    const intervalId = setTimeout(start, 1000);
    if (timer.timeRemaining <= 0) {
      heroTimer.style.display = 'none';
      heroText.style.display = 'none';
      clearTimeout(intervalId);
    }
  };

  start();
};
