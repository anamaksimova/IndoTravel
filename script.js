import {timer} from './modules/timer.js';

document.querySelector('.timer').dataset.deadline = '2022-05-15 21:23';
const deadline = document.querySelector('.timer').dataset.deadline;
timer(deadline);
