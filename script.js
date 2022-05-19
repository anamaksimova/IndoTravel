import {timer} from './modules/timer.js';
import './modules/accord.js';
import './modules/burger.js';
import './modules/animation.js';
document.querySelector('.timer').dataset.deadline = '2022-05-18 15:44';
const deadline = document.querySelector('.timer').dataset.deadline;
timer(deadline);
