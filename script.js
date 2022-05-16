import {timer} from './modules/timer.js';

document.querySelector('.timer').dataset.deadline = '2022-05-18 15:44';
const deadline = document.querySelector('.timer').dataset.deadline;
timer(deadline);
