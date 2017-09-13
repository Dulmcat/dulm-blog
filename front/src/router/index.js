import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Hello = () => import('@/components/Hello.vue')
const World = () => import('@/components/World.vue')
const Main = () => import('@/components/Main.vue')
const Index = () => import('@/components/index.vue')
const Archives = () => import('@/components/Archives.vue')
const Tags = () => import('@/components/Tags.vue')
const About = () => import('@/components/About.vue')

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/main/index',
            children: [
                {
                    path: '/main/index',
                    name: 'Index',
                    component: Index
                },
                {
                    path: '/main/archives',
                    name: 'Archives',
                    component: Archives
                },
                {
                    path: '/main/tags',
                    name: 'Tags',
                    component: Tags
                },
                {
                    path: '/main/about',
                    name: 'About',
                    component: About
                }
            ]
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
