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

module.exports = mongoose.model('user', userSchema);