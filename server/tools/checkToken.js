const config = require('../configs');
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
    const authorization = ctx.get('authorization');
    if (authorization) {
        let token = authorization.split(' ')[1];
        try {
            let tokenCtx = jwt.verify(token, config.jwt.secret);
            console.log(tokenCtx);
        } catch (err) {
            ctx.throw(401, 'token验证失败！');
        }
    } else {
        ctx.throw(401, '请在http头部写入authorization');
    }
    console.log('鉴权成功！');
    await next();
};