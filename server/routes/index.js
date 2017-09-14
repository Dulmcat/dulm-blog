const config = require('../configs');
const checkToken = require('../tools/checkToken');
const Router = require('koa-router');

const router = new Router({
    prefix: config.app.routerPrefixApi
});

const tag = require('../controllers/tag');
const user = require('../controllers/user');
const article = require('../controllers/article');

/* REST风格 api
 * 
 * PUT --> 换
 * GET --> 查
 * POST --> 增
 * PATCH --> 改
 * DELETE --> 删
 * 
 * */

router
    .post('/login', user.login) // 登陆

    .get('/tags', tag.getAllTags) // 获得所有标签
    .post('/tags', tag.addTag)  // 添加标签
    .patch('/tags/:id', checkToken, tag.editTag) // 修改标签
    .delete('/tags/:id', checkToken, tag.delTag) // 删除标签

    .post('/articles', checkToken, article.addArticle) // 添加文章
    .delete('/articles/:id', checkToken, article.delArticle) // 删除文章
    .patch('/pubArticles/:id', checkToken, article.publishArticle) // 发布文章
    .patch('/articles/:id', checkToken, article.editArticle) // 修改文章
    .get('/articles/:id', article.getSingleArticle) // 获得单个文章
    .get('/allArticles', checkToken, article.getAllArticles) // 获得所有文章，包括发布和未发布的，仅供后台使用
    .get('/articles', article.getAllPublishedArticles); // 获得所有已发布文章，供前台使用

module.exports = router;
