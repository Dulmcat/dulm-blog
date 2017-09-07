<template>
    <div class="manage">
        <h1>文章管理</h1>
        <el-row class="row-head">
            <el-col :span="4">
                <div class="grid-content bg-purple">标题</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">标签</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">摘要</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">创建时间</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">最后修改时间</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">操作</div>
            </el-col>
        </el-row>
        <el-row class="row-main" v-for="(item, index) in articles" key="item">
            <el-col :span="4">
                <div class="grid-content bg-purple">{{item.title}}</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-tag v-for="(i, index) in item.tags" key="i">{{i.name}}</el-tag>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">{{item.abstract}}</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    {{item.createTime}}
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">{{item.lastEditTime}}</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" size="small" @click="edit(item, index)">编辑</el-button>
                    <el-button type="danger" size="small" @click="dele(item, index)">删除</el-button>
                    <el-button type="primary" size="small" @click="notPub(item, index)" v-if="item.publish === true">取消发布</el-button>
                    <el-button type="primary" size="small" @click="pub(item, index)" v-else="item.publish === false">发布文章</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'Manage',
    data() {
        return {
            articles: [],
        }
    },
    created() {
        // TODO 后续考虑加上分页
        // 现在是展示所有
        this.$store.dispatch('getAllArticles').then(res => {
            this.articles.push(...res.data);
        });
    },
    methods: {
        // 编辑文章，直接转到admin/article, 在编辑页面通过路由判断
        edit(item, index) {
            this.$router.replace({ path: '/admin/article', query: { index } });
        },
        dele(item, index) {
            this.$confirm('确定删除这篇文章？删除后无法恢复！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                this.$store.dispatch('delArticle', { id: item.id, index }).then(res => {
                    if (res.code === 200) {
                        this.articles.splice(index, 1);
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '成功删除一篇文章'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        notPub(item, index) {
            this.$confirm('确定取消发布这篇文章？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                this.$store.dispatch('notPubArticle', { id: item.id, index }).then(res => {
                    if (res.code === 200) {
                        item.publish = res.data.publish;
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '取消发布成功'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    showClose: true,
                    type: 'info',
                    message: '并没有取消发布'
                });
            });
        },
        pub(item, index) {
            this.$confirm('确定发布这篇文章？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                this.$store.dispatch('pubArticle', { id: item.id, index }).then(res => {
                    if (res.code === 200) {
                        item.publish = res.data.publish;
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '发布成功'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    showClose: true,
                    type: 'info',
                    message: '并没有发布'
                });
            });
        }
    }
}
</script>

<style scoped lang="less">
.manage {
    max-width: 1400px;
    padding: 0 10px;
    h1 {
        text-align: center;
    }
    li {
        font-size: 16px;
    }
}

.el-row {
    border-bottom: 1px solid #f6f6f6;
    &:last-child {
        margin-bottom: 0;
        border: none;
    }
}

.row-main {}

.el-col {
    border-radius: 0;
}

.el-tag {
    margin-left: 8px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 0;
    min-height: 42px;
    text-align: center;
    line-height: 42px;
    overflow: hidden;
    /*自动隐藏文字*/
    text-overflow: ellipsis;
    /*文字隐藏后添加省略号*/
    white-space: nowrap;
    /*强制不换行*/
}
</style>