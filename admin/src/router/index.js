import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/hello',
        name: 'Hello',
        component: resolve => require(['../components/Hello.vue'], resolve)
    },
    {
        path: '/login',
        name: 'Login',
        component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/login'
    }
  ]
})
