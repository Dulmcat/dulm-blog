const config = require('../configs/index');
const qiniu = require('qiniu');

let accessKey = config.qiniu.ak
let secretKey = config.qiniu.sk
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

let options = {
    scope: config.qiniu.bucket,
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let token = putPolicy.uploadToken(mac);

const uploadToken = async(ctx) => {
    return ctx.body = {
        code: 200,
        msg: '标签创建成功！',
        data: token
    }
}

module.exports = { uploadToken }