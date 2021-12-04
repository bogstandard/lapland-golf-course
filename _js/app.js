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

  const month = new Date().getMonth();
  let day = new Date().getDate();
  if(month == 11 && day >= 1 && day <= 25) {
    // ..
  } else {
    day = 25;
  }

  const img = new Image();
  img.onload = () => {
    advent.classList.add('is-visible');
    door.textContent = day;
    backdoor.style.backgroundImage = `url("/assets/images/advents/${day-1}.png")`;
  };
  img.onerror = ()=>{};
  img.src = `/assets/images/advents/${day-1}.png`;


