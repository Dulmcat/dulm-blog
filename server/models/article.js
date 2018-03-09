const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const chinaTime = require('china-time');
moment.locale('zh-cn');

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
    return chinaTime('YYYY-MM-DD HH:mm:ss');
});
articleSchema.path('lastEditTime').get(function (v) {
    return chinaTime('YYYY-MM-DD HH:mm:ss');
});

module.exports = mongoose.model('article', articleSchema);