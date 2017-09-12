import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Hello = () => import('@/components/Hello.vue')
const World = () => import('@/components/World.vue')
const Main = () => import('@/components/Main.vue')

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/world',
            name: 'World',
            component: World
        }
    ]
})
