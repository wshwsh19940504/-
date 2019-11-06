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
//路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.路由前置钩子
  //因为vuex不能保存，所以从localstorage里面拿出来token
  store.commit('settoken',localStorage.getItem('token'))
  if (to.meta.requireAuth) {
    //token已经存在，直接跳转
    if (store.state.token) {
      next()
    }else{
      next({
        path:'/login',
        //带redirect，为了登录过后，直接返回登录前页面
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
