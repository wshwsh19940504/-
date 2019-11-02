import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import setaxios from './setaxios'
//因为是暴露了一个方法，所以执行一下
setaxios()
Vue.config.productionTip = false
Vue.prototype.$http=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
