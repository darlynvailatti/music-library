import Vue from 'vue'
import App from './App.vue'

// Third-Party
import vuetify from './plugins/vuetify';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

// Mixins


//Vue Modules
import store from '@/store'
import router from '@/router'


Vue.use(VueToast);

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
