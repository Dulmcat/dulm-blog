import * as types from '../mutation_types.js'
import APi from '../../libs/Api.js'
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
    },
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
    }

};

const actions = {

};

export default {
    state,
    mutations,
    actions
}