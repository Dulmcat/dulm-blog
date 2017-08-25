const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 定义tag模型
const tagSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('tag', tagSchema);