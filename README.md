## 目录结构

```
- admin ———管理后台文件夹

- front ———文章展示前端文件夹

- server ———服务端文件夹 
    |-configs ———配置文件夹
        |-index.js ——默认配置
        |-private.js ——自定义配置
    |-controllers ——控制器文件夹
        |-tag.js ——标签配置
        |-user.js ——用户配置
    |-middlewares ——中间件文件夹
        |-errorHandle.js ——错误处理中间价
        |-setAdmin.js ——设置默认的管理员账户密码
    |-models ——模型文件夹
        |-article.js ——文章模型
        |-index.js ——//一开始默认写在这里，后来抽离了出去
        |-tag.js ——标签模型
        |-user.js ——用户模型
    |-node_modules ——依赖文件
    |-routes ——路由文件
        |-index.js ——路由，采用RESTful风格
    |-tools ——工具文件
        |-createToken.js ——创建token
        |-checkToken.js ——检查token
    app.js ——入口文件
```

使用以下方法开启
```
npm install

node app

npm run dev

```

---
## 参考于以下项目
- [sinner77/vue-koa2-blog](https://github.com/sinner77/vue-koa2-blog)
- [Ma63d/kov-blog](https://github.com/Ma63d/kov-blog)

---
## 可供学习的参考资料
- [ECMAScript 6入门](http://es6.ruanyifeng.com/)
- [一起学node.js](https://maninboat.gitbooks.io/n-blog/content/)
- [Koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)
