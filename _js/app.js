import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Golf from './components/Golf.vue';


/**
 * Theme toggle!!
 */
const changeTheme = (theme) => {
    document.body.setAttribute("data-theme", theme)
    localStorage.setItem("data-theme", theme)
}

// initial
let theme = localStorage.getItem('data-theme') || 'light';
changeTheme(theme);

// checkbox
const checkbox = document.getElementById("switch");
checkbox.addEventListener('change', () => {
    let theme = localStorage.getItem('data-theme') || 'light';
    if (theme ==='comfy'){
        changeTheme('light')
    } else {
        changeTheme('comfy')
    }
});

/**
 * Vue!!
 */
Vue.use(VueSweetalert2);

const app = new Vue({
  el: '#js-golf',
  components: { Golf },
});

/**
 * Goofy advent calendar
 */
  const advent = document.querySelector('.advent');
  const backdoor = advent.querySelector('.backDoor');
  const door = advent.querySelector('.door');

  advent.addEventListener('click', () => {
    advent.classList.toggle('doorOpen');
  });

  const images = [
    '1.png',
    '2.png',
    '3.png',
    '4.png',
    '5.png',
    '6.pn',
    '7.png',
    '8.jpg',
    '9.jpg',
    '10.png',
    '11.jpg',
    '12.jpeg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.png',
    '18.jpeg',
    '19.jpg',
    '20.gif',
    '21.png',
    '22.jpg',
    '23.jpg',
    '24.jpg',
    '25.png',
  ];

  const month = new Date().getMonth();
  let day = new Date().getDate();
  if(month == 11 && day >= 1 && day <= 25) {
    // ..
  } else {
    day = 25;
  }

  door.textContent = day;
  backdoor.style.backgroundImage = `url(${window.relative_url}assets/images/advents/${images[day-1]})`;


