import 'current-script-polyfill'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import moment from 'moment'
Vue.prototype.moment = moment


Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
