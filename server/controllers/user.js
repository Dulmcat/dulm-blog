const md5 = require('md5');
const User = require('../models/index').user; // 从index中查找userSchema
const createToken = require('../tools/createToken');

// 用户登录
const login = async (ctx) => {
    const {username, password} = ctx.request.body;
    if (!username) {
        ctx.throw(400, '用户名不能为空！');
    }
    if (!password) {
        ctx.throw(400, '密码不能为空！');
    }
    let result = await User.findOne({username}).exec().catch(err => {
        ctx.throw(500, '服务器错误 --> 无法查找user数据！');
    });
    if (result) {
        if (result.password === md5(password)) {
            let token = createToken(result._id);
            return ctx.body = {
                code: 200,
                msg: '密码正确！',
                data: {
                    uid: result._id,
                    name: result.name,
                    username: result.username,
                    createTime: result.createTime
                }
            }
        } else {
            return ctx.body = {
                code: 200,
                msg: '密码错误！',
            }
        }
    } else {
        return ctx.body = {
            code: 200,
            msg: '用户名不存在！'
        }
    }
};

// 用户退出
const logout = async (ctx) => {
    return ctx.body = {
        code: 200,
        msg: '退出成功！'
    }
};

// 改变管理员密码
const changeAdminPwd = async (ctx) => {
    const id = ctx.request.body.id;
    const password = md5(ctx.request.body.password);
    await User.findByIdAndUpdate(id, {password}).exec().catch(err => {
        ctx.throw(500, '服务器内部错误-->重置管理员密码错误！');
    });
    return ctx.body = {
        code: 200,
        msg: '更改管理员密码成功'
    }
};

module.exports = {
    login,
    logout,
    changeAdminPwd
};


