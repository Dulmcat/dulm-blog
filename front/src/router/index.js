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
const Articles = () => import('@/components/Articles.vue')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/blog/index',
            children: [
                {
                    path: '/blog/index',
                    name: 'Index',
                    component: Index
                },
                {
                    path: '/blog/archives',
                    name: 'Archives',
                    component: Archives
                },
                {
                    path: '/blog/tags',
                    name: 'Tags',
                    component: Tags
                },
                {
                    path: '/blog/about',
                    name: 'About',
                    component: About
                },
                {
                    path: '/blog/articles/:id',
                    name: 'Articles',
                    component: Articles
                }
            ]
        },
        {
            path: '*',
            redirect: '/blog/index'
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
