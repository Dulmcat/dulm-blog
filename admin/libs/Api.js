import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';

export default {
    //管理员登陆
    login(data){
        return axios.post(baseUrl + '/login', data);
    }
}