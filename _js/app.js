import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Golf from './components/Golf.vue';

Vue.use(VueSweetalert2);

const app = new Vue({
  el: '#js-golf',
  components: { Golf },
});
