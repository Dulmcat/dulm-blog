import * as types from '../mutation_types.js'
import Api from '../../libs/Api.js'
const state = {
    thisArticle: {
        _id: -1,
        index: -1,
        abstract: '',
        content: '',
        titlt: '',
        tags: [],
        publish: false,
        save: false,
    },
    allArticles: [],
    allTags: []
};

const mutations = {
    // 登出 --> 清空thisArticle
    [types.RESET](state){
        state.thisArticle._id = -1;
        state.thisArticle.index = -1;
        state.thisArticle.abstract = '';
        state.thisArticle.content = '';
        state.thisArticle.titlt = '';
        state.thisArticle.tags = [];
        state.thisArticle.publish = false;
        state.thisArticle.save = false;
        state.allArticles = [];
        state.allTags = [];
    },
    // 创建标签
    [types.ADD_TAG](state, tag){
        state.thisArticle.tags.push(tag);
        if(!state.allTags.some(o => o._id === tag._id)){
            state.allTags.push(tag);
        }
    },
    // 删除标签
    [types.DEL_TAG](state, id){
        let thisAticleTagIndex = state.thisArticle.tags.findIndex(o => o._id === id);
        if(thisAticleTagIndex >= 0){
            state.thisArticle.tags.splice(thisAticleTagIndex,1);
        }
        let allArticleIndex = state.allTags.findIndex(o => o._id === id);
        if(allArticleIndex >= 0){
            state.allTags.splice(allArticleIndex, 1);
        }
        state.allArticles.forEach(article => {
            let index = article.tags.findIndex(o => o._id === id);
            if(index >= 0){
                article.tags.splice(index, 1);
            }
        });
    },
    // 获得标签
    [types.GET_ALL_TAGS](state, tags){
        state.allTags = tags;
    },
    // 修改标签


    // 新建文章
    [types.ADD_ARTICLE](state, article){
        state.thisArticle._id = article._id;
        state.thisArticle.title = article.title;
        state.thisArticle.abstract = article.abstract;
        state.thisArticle.content = article.content;
        state.thisArticle.index = 0;
        state.thisArticle.tags = article.tags;
        state.thisArticle.save = true;
        state.thisArticle.publish = false;
        state.currentArticle.index = 0;
        state.allArticles.unshift(article);
    },
    // 修改文章
    [types.CHANGE_ARTICLE](state, {article, index}){
        state.thisArticle._id = article._id;
        state.thisArticle.title = article.title;
        state.thisArticle.abstract = article.abstract;
        state.thisArticle.content = article.content;
        state.thisArticle.tags = article.tags;
        state.thisArticle.save = true;
        state.thisArticle.publish = article.publish;
        if(index > 0){
            state.thisArticle.index = index;
        }
        
        let nowArticle = state.allArticles[state.thisArticle.index];
        nowArticle.title = article.title;
        nowArticle.abstract = article.abstract;
        nowArticle.content = article.content;
        nowArticle.tags = article.tags;
        nowArticle.latEditTime = article.lastEditTime;
    }

};

const actions = {
    // 创建标签
    addTag({commit}, tag){
        return new Promise((resolve, reject) => {
            Api.addTag({name: tag}).then(res => {
                if(res.data){
                    commit(types.ADD_TAG, res.data.data);
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err);
            })
        })
    },
    // 删除标签
    delTag({commit}, id){
        return new Promise((resolve, reject) => {
            Api.delTag(id).then(res => {
                if(res.status === 200){
                    commit(types.DEL_TAG, id);
                    resolve(res.data);
                }
            })
            .catch(err => {
                reject(err);
            })
        })
    },
    getAllTags({commit}) {
        return new Promise((resolve, reject) => {
            Api.getAllTags().then(res => {
                commit(types.GET_ALL_TAGS, res.data.data);
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
    // 保存文章 --> 1.新文章用新建文章； 2.旧文章编辑保存用修改文章

};

export default {
    state,
    mutations,
    actions
}