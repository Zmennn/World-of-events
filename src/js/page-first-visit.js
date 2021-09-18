import 'animate.css';
import { markup } from './preprocessing-markup.js';

export function firstVisit() {
  window.onload = function () {
    document.cookie = 'visited=True';
  };
  if (document.cookie !== 'visited=True') {
    console.log('!==visited=True');
  } else {
    console.log('visited=True');
    // const grid = document.querySelector('.event-grid');
    // grid.classList.add('');
  }
}
