import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import http from '@/api'

// import axios from 'axios'
Vue.config.productionTip = false;
// Vue.prototype.$http = http
// Vue.prototype.bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app');


