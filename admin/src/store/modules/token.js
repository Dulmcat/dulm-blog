import * as types from '../mutation_types';
import Api from './../../libs/Api';

const state = {
    token: sessionStorage.getItem('userToken')
}

// 注册事件类型
const mutations = {
    [types.TOKEN_CREATE]: (state, val) => {
        state.token = val;
        sessionStorage.setItem('userToken', val)
    },
    [types.TOKEN_DELETE]: (state) => {
        state.token = null;
        sessionStorage.removeItem('userToken');
    }
};

const actions = {
    createToken({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            Api.login({ username, password }).then(res => {
                // 登陆成功
                
                if (res.data.code === 200) {
                    let token = res.data.token;
                    commit(types.TOKEN_CREATE, token);
                    resolve(res.data)
                }
                // 登陆失败
                if (!res.data.token) {
                    commit(types.TOKEN_DELETE);
                    resolve(res.data);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }
};

export default {
    state,
    mutations,
    actions
}