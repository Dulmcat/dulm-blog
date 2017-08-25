const config = require('../configs');
const User = require('../models/index').user;
const md5 = require('md5');

const setAdmin = async(ctx, next) => {
    const username = config.admin.username;
    const password = md5(config.admin.password);
    const name = config.admin.name;
    let result = await User.find().exec().catch(err => {
        ctx.throw(500, '服务器错误-->数据库查找admin错误！');
    });
    if (result.length === 0) {
        let user = new User({
            name,
            username,
            password,
            createTime: new Date()
        });
        await user.save().catch(err => {
            ctx.throw(500, '服务器错误-->数据库存储admin错误！')
        });
        console.log('已设置admin账号密码');
    }
    await next(); // 进入下一个中间件
};

module.exports = setAdmin;