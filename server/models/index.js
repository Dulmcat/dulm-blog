const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('zh-cn');

// 定义user模型
const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    createTime: Date
});
userSchema.set('toJSON', {getters: true, virtuals: true});
userSchema.set('toObject', {getters: true, virtuals: true});
userSchema.path('createTime').get(function(v){
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
});

// 定义tag模型
const tagSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
});

// 定义article模型
const articleSchema = new Schema({
    title: String,
    content: String,
    abstract: String,
    publish: {
        type: Boolean,
        default: false
    },
    createTime: Date,
    lastEditTime: {
        type: Date,
        default: Date.now
    },
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag'}]
});

articleSchema.set('toJSON', {getters: true, virtuals: true});
articleSchema.set('toObject', {getters: true, virtuals: true});
articleSchema.path('createTime').get(function(v){
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
});
articleSchema.path('lastEditTime').get(function (v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss');
});

const user = mongoose.model('user', userSchema);
const tag = mongoose.model('tag', tagSchema);
const article = mongoose.model('article', articleSchema);

module.exports = {
    user,
    tag,
    article
};