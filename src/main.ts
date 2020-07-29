import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/axios';
import '@babel/polyfill';
import Notifications from 'vue-notification';
import VueKonva from 'vue-konva';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(VueKonva);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
