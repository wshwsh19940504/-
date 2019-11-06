import Vue from 'vue'
import Router from 'vue-router'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'register',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import( './views/index.vue')
    },
    {
      path: '/botnav',
      name: 'botnav',
      component: () => import( './views/botnav.vue'),
      children:[
        //二级路由里面不需要加/
        {
          path: 'index',
          name: 'index',
          component: () => import( './views/index.vue')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import( './views/List.vue')
        },
        {
          path: 'search',
          name: 'search',
          meta:{
            requireAuth:true//需要登陆权限才会展示
          },
          component: () => import( './views/Search.vue')
        },
        {
          path: 'mine',
          name: 'mine',
          meta:{
            requireAuth:true//需要登陆权限才会展示
          },
          component: () => import( './views/Mine.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          meta:{
            requireAuth:true//需要登陆权限才会展示
          },
          component: () => import( './views/Cart.vue')
        }
      ]
    }
  ]
})
