import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://localhost:44347/api/app';
axios.defaults.timeout = 30000

new Vue({
  render: h => h(App),
}).$mount('#app')
