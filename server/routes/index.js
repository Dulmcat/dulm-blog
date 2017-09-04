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
    .post('/login', user.login)

    .get('/tags', tag.getAllTags)
    .post('/tags', tag.addTag)
    .patch('/tags/:id', checkToken, tag.editTag)
    .delete('/tags/:id', checkToken, tag.delTag)

    .post('/articles', checkToken, article.addArticle)
    .delete('/articles/:id', checkToken, article.delArticle)
    .patch('/pubArticles/:id', checkToken, article.publishArticle)
    .patch('/articles/:id', checkToken, article.editArticle)
    .get('/articles/:id', article.getSingleArticle)
    .get('/allArticles', checkToken, article.getAllArticles)
    .get('/articles', article.getAllPublishedArticles);

module.exports = router;
