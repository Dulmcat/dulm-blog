import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Hello from '../components/Hello.vue'
import Login from '../components/Login.vue'

Vue.use(Router)
// TODO 路由懒加载
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/hello',
            name: 'Hello',
            component: Hello,
            meta: {
                requireToken: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
});

// 注册全局钩子检查meta字段
router.beforeEach((to, from, next) => {
    let token = store.state.token.token;
    if(to.meta.requireToken){
        if(token){
            return next();
        }
        next({
            path: '/login',
            query: {redirect: to.fullpath}
        })
    } else {
        next();
    }
});

export default router;
