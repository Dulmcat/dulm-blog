import axios from 'axios'
import store from './../store/index.js'
import router from './../router'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 5000;

// request
axios.interceptors.request.use((config) => {
    if (store.state.token.token) {
        config.headers.Authorization = `token ${store.state.token.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// response
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        switch(error.response.status){
            case 401:
                store.commit('TOKEN_DELETE');
                router.replace({
                    path: '/login',
                });
        }
    }
    return Promise.reject(error);
})