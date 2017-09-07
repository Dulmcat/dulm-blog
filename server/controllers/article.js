const Article = require('../models/index').article;

// 添加新文章
const addArticle = async (ctx, next) => {
    const { title, content, publish, tags, abstract } = ctx.request.body;
    const createTime = new Date();
    const lastEditTime = new Date();
    if (!title) {
        ctx.throw(500, '标题不能为空！');
    }
    if (!content) {
        ctx.throw(500, '内容不能为空！');
    }
    if (!abstract) {
        ctx.throw(500, '摘要不能为空！');
    }
    const article = new Article({
        title,
        content,
        abstract,
        publish,
        createTime,
        lastEditTime,
        tags
    });
    let result = await article.save().catch(err => {
        ctx.throw(500, '服务器内部错误-->数据库存储article出错！');
    });
    await result.populate('tags').execPopulate().catch(err => {
        ctx.throw(500, '服务器内部错误-->数据库populate出错！');
    });
    return ctx.body = {
        code: 200,
        msg: '文章创建成功',
        data: result
    }
};

// 发布文章
const publishArticle = async (ctx) => {
    const id = ctx.params.id;
    const publish = ctx.request.body.publish;
    console.log(publish)
    if(typeof(publish) !== 'boolean'){
        ctx.throw(400, 'punlish字段必须为布尔值！');
    }
    let result = await Article
        .findByIdAndUpdate(id, {
            publish
        }, {
            new: true
        })
        .exec()
        .catch(err => {
            ctx.throw(500, '服务器内部错误-->更新发布状态错误！');
        });
    return ctx.body = {
        code: 200,
        msg: '更新状态成功！',
        data: result
    }
};

// 删除文章
const delArticle = async (ctx) => {
    const id = ctx.params.id;
    let result = await Article.findByIdAndRemove(id).exec().catch(err => {
        ctx.throw(500, '服务器内部错误-->数据库删除文章出错！');        
    });
    return ctx.body = {
        code: 200,
        msg: '删除文章成功！',
        data: result
    }
};

// 编辑文章
const editArticle = async (ctx) => {
    const { title, content, tags, abstract } = ctx.request.body;
    const lastEditTime = new Date();
    const id = ctx.params.id;
    if (!title) {
        ctx.throw(500, '标题不能为空！');
    }
    if (!content) {
        ctx.throw(500, '内容不能为空！');
    }
    if (!abstract) {
        ctx.throw(500, '摘要不能为空！');
    }
    let result = await Article.findByIdAndUpdate(id, {
        title,
        content,
        abstract,
        tags,
        lastEditTime
    }, {
        new: true
    }).populate('tags').exec().catch(err => {
        ctx.throw(500, '服务器内部错误-->数据库修改文章出错！')
    })
    return ctx.body ={
        code: 200,
        msg: '修改成功！',
        data: result
    }
};

// 获取单个文章，通过id获取
const getSingleArticle = async (ctx) => {
    const id = ctx.params.id;
    let result = await Article.findById(id).catch(err => {
        ctx.throw(500, '服务器内部错误-->数据库查找文章id错误！');
    });
    await result.populate('tags').execPopulate().catch(err => {
        ctx.throw(500, '服务器内部错误-->数据库populate出错！');
    });
    return ctx.body = {
        code: 200,
        msg: '文章创建成功！',
        data: result
    }
};

// 获取所有文章，包括未发布的文章，仅供后台使用
const getAllArticles = async (ctx) => {
    let tagId = ctx.query.tag; // 标签查找
    let page = +ctx.query.page; // 分页查找
    let limit = +ctx.query.limit || 5; // 分页数量
    let result, total;
    if (page <= 0) {
        page = 1;
    }
    if (tagId) {
        result = await Article
            .find({ tags: tagId })
            .populate('tags')
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->标签查找所有文章错误！');
            });
    } else if (page && limit) {
        result = await Article
            .find()
            .sort({'creatTime': -1})
            .skip(limit * (page -1))
            .limit(limit)
            .populate('tags')
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->分页查找所有文章错误！');
            });
        total = await Article
            .count()
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->总数查找错误！');
            })
    } else { // 没有传递任何参数时， 返回所有文章
        result = await Article
            .find()
            .sort({'createTime': -1})
            .populate('tags')
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->直接查找所有文章错误！');
            });
    }
    return ctx.body = {
        code: 200,
        msg: '查询所有文章成功！',
        data: result,
        total
    }
};

// 获取所有已发布文章
const getAllPublishedArticles = async (ctx) => {
    let tagId = ctx.query.tag; // 标签查找
    let page = +ctx.query.page; // 分页查找
    let limit = +ctx.query.limit || 5; // 分页数量
    let result, total;
    if (page <= 0) {
        page = 1;
    }
    if (tagId) {
        result = await Article
            .find({ 
                tags: tagId,
                publish: true 
            })
            .populate('tags')
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->标签查找所有文章错误！');
            });
    } else if (page && limit) {
        result = await Article
            .find({ 
                publish: true 
            })
            .sort({'creatTime': -1})
            .skip(limit * (page -1))
            .limit(limit)
            .populate('tags')
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->分页查找所有文章错误！');
            });
        total = await Article
            .count()
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->总数查找错误！');
            })
    } else { // 没有传递任何参数时， 返回所有文章
        result = await Article
            .find({ 
                publish: true 
            })
            .sort({'createTime': -1})
            .populate('tags')
            .exec()
            .catch(err => {
                ctx.throw(500, '服务器内部错误-->直接查找所有文章错误！');
            });
    }
    return ctx.body = {
        code: 200,
        msg: '查询所有文章成功！',
        data: result,
        total
    }
};

module.exports = {
    addArticle,
    delArticle,
    publishArticle,
    editArticle,
    getSingleArticle,
    getAllPublishedArticles,
    getAllArticles
}