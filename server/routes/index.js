const config = require('../configs');
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
    .patch('/tags/:id', tag.editTag)
    .delete('/tags/:id', tag.delTag)

    .post('/articles', article.addArticle)
    .delete('/articles/:id', article.delArticle)
    .patch('/pubArticles/:id', article.publishArticle)
    .patch('/articlec/:id', article.editArticle)
    .get('/articles/:id', article.getSingleArticle)
    .get('/allArticles', article.getAllArticles)
    .get('/articles', article.getAllPublishedArticles);

module.exports = router;
