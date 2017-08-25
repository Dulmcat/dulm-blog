const config = require('../configs');
const Router = require('koa-router');

const router = new Router({
    prefix: config.app.routerPrefixApi
});

const tag = require('../controllers/tag');
const user = require('../controllers/user');

/*
 * REST api
 * PUT --> 换
 * GET --> 查
 * POST --> 增
 * PATCH --> 改
 * DELETE --> 删
 * */

router
    .post('/login', user.login)

    .get('/tags', tag.getAllTags)
    .post('/tags', tag.addTag)
    .patch('/tags/:id', tag.editTag)
    .delete('/tags/:id', tag.delTag);

module.exports = router;
