const fs = require('fs');

let config = {
    app: {
        port: process.env.PORT || 3001,
        routerPrefixApi: '/api'
    },
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/v-k-blog',
        secret: {           // 非必须
            user: '',
            pwd: ''
        }
    },
    jwt: {
        secret: 'secrets',
        expiresIn: '1h'
    },
    admin: {
        username: 'admin',
        password: 'admin123',
        name: 'liushang'
    }
};

// 可以设置私有配置 -->private.js 格式应与上面相同
if (fs.existsSync(__dirname + '/private.js')) {
    config = Object.assign(config, require('./private.js'));
}

module.exports = config;