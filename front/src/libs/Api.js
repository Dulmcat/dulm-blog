import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api';
const baseUrl = 'http://23.83.228.171:3001/api';

export default {
    // 获得所有已发布文章
    getAllPubArticles() {
        return axios.get(baseUrl + '/articles');
    },
    // 通过分页获取
    getArticlesByPage(page, limit){
        return axios.get(`${baseUrl}/articles?page=${page}&limit=${limit}`);
    },
    // 通过id获取
    getSingleArticle(id){
        return axios.get(baseUrl + '/articles/' + id);
    },
    // 通过tagId获取文章
    getArticlesByTagId(id){
        return axios.get(`${baseUrl}/articles?tag=${id}`);
    },
    getAllTags(){
        return axios.get(baseUrl + '/tags');
    },

}