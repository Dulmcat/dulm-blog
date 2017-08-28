// 引入 koa
const Koa = require('koa');
const app = new Koa();

// 引入配置文件 --> configs
const config = require('./configs');

// bodyParser 中间件
const bodyParser = require('koa-bodyparser');

// 错误处理中间件
const errorHandle = require('./middlewares/errorHandle');

// 设置初始admin账户密码
const setAdmin = require('./middlewares/setAdmin');

// 路由
const router = require('./routes');

// 引入mongoose，并连接数据库
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(config.mongodb.url, {useMongoClient: true});
mongoose.connection
    .on('error', (error) => {
        console.log(error);
    })
    .once('open', () => {
        console.log('数据库连接成功！');
    });

// 引入bodyParser 中间件
app.use(bodyParser());

// 引入错误处理中间件
app.use(errorHandle);

// 使用setAdmin中间件-->只有在首次启动项目才会创建admin账户密码
app.use(setAdmin);

// 使用路由
app
    .use(router.routes())
    .use(router.allowedMethods());

// 监听端口
app.listen(config.app.port, () => {
    console.log('Server is running at http://127.0.0.1:' + config.app.port);
});
