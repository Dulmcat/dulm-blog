import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';
let userToken = sessionStorage.getItem('userToken');

export default {
    // 管理员登陆
    login(data){
        return axios.post(baseUrl + '/login', data);
    },
    // 登出
    logout(){
        return axios.post(baseUrl + '/logout');
    }
}