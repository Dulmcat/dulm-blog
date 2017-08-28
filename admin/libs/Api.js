import axios from 'axios';

export default {
    //管理员登陆
    login(data){
        return axios.post('api/login', data);
    }
}