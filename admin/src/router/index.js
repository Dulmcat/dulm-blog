import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/hello',
            name: 'Hello',
            component: resolve => require(['../components/Hello.vue'], resolve),
            meta: {
                requireToken: true
            }
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
});

// 注册全局钩子检查meta字段
router.beforeEach((to, from, next) => {
    let token = store.state.token;
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
