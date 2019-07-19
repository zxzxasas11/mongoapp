import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/css/global.css';

import axios from 'axios';
Vue.prototype.axios = axios;

import moment from "moment";
Vue.prototype.moment = moment

import qs from 'qs';
Vue.prototype.$qs = qs;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

import 'babel-polyfill';
/* eslint-disable no-new */


import Promise from 'es6-promise';
Promise.polyfill();








Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
