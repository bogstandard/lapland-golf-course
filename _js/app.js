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

