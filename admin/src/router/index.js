import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'
import Edit from '../components/Aedit/edit.vue'
import Manage from '../components/Amanage/manage.vue'
import Tag from '../components/Atag/tag.vue'

Vue.use(Router)
// TODO 路由懒加载
const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/admin',
            name: Admin,
            component: Admin,
            meta: {
                requireToken: true
            },
            redirect: '/admin/article',
            children: [
                {
                    path: 'article',
                    name: 'Edit',
                    component: Edit,
                    meta: {
                        requireToken: true
                    }
                },
                {
                    path: 'list',
                    name: 'Manage',
                    component: Manage,
                    meta: {
                        requireToken: true
                    }
                },
                {
                    path: 'tag',
                    name: 'Tag',
                    component: Tag,
                    meta: {
                        requireToken: true
                    }
                }
            ]
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
