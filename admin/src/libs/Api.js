import axios from 'axios';
const baseUrl = 'http://localhost:3001/api';

export default {
    // 管理员登陆
    login(data){
        return axios.post(baseUrl + '/login', data);
    },
    // 登出
    logout(){
        return axios.post(baseUrl + '/logout');
    },
    // 创建文章
    addArticle(data){
        return axios.post(baseUrl + '/articles', data);
    },
    // 删除文章
    delArticle(id){
        return axios.delete(baseUrl + '/articles/' + id);
    },
    // 发布文章
    pubArticle(id, bollean){
        return axios.patch(baseUrl + '/articles/' + id, {publish: bollean});
    },
    // 修改文章
    changeArticle(id, data){
        return axios.patch(baseUrl + '/artcles/' + id, data);
    },
    // 获得单个文章
    getSingleArticle(id){
        return axios.get(baseUrl + '/articles/' + id);
    },
    // 获得所有文章
    getAllArticles(){
        return axios.get(baseUrl + '/allArticles');
    },
    // 获得所有已发布文章
    getAllPubArticles(){
        return axios.get(baseUrl + '/articles');
    },
    // 创建标签
    addTag(data){
        return axios.post(baseUrl + '/tags', data);
    },
    // 获取所有标签
    getAllTags(){
        return axios.get(baseUrl + '/tags');
    },
    // 修改标签
    editTag(data){
        return axios.patch(baseUrl + '/tags/' + id, data);
    },
    // 删除标签
    delTag(id){
        return axios.delete(baseUrl + '/tags/' + id);
    }
}