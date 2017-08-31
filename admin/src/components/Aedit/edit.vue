<template>
    <div class="article-warp">
        <div class="title">
            <h3>文章标题</h3>
            <el-input id="title" type="text" v-model="title" placeholder="请输入标题"></el-input>
        </div>
        <div class="tag">
            <h3>标签</h3>
            <el-input id="tag" type="text" v-model="tag" placeholder="请输入标签"></el-input>
            <el-button type="primary" @click.stop="addTag()">点击添加</el-button>
            <ul class="tag-list">
                <li class="list-item" v-for="(item, index) in tagArr">
                    <el-button icon="delete" @click="delTag(item, index)">{{item.name}}</el-button>
                </li>
            </ul>
        </div>
        <textarea id="editor"></textarea>
        <div class="btn">
            <el-button @click.stop="clearAll()">清除草稿</el-button>
            <el-button type="primary" @click.stop="pubArticle()">发布文章</el-button>
        </div>
    </div>
</template>

<script>
    import Simplemde from 'simplemde';
    import marked from 'marked';
    let simplemde;
    export default {
        name: 'Edit',
        data() {
            return {
                title: '',
                tag: '',
                tagArr: [],
            }
        },
        mounted(){
            simplemde = new Simplemde({
                autoDownloadFontAwesome:true,
                spellChecker:false,
                element: document.getElementById('editor'),
                placeholder: "Press Ctrl+S to save the article...",
                previewRender: function(plainText) {
                    return marked(plainText); // Returns HTML from a custom parser
                },
                tabSize: 4
            });
            //按下ctrl+s就保存文章
            simplemde.codemirror.on('keydown', (cm, e) => {
                if( e.ctrlKey  == true && e.keyCode === 83 ){
                    //保存文章并阻止浏览器保存页面的默认事件
                    this.saveArticle();
                    e.preventDefault();
                }
            });
        },
        methods: {
            addTag(){
                if(this.tag === ''){
                    this.$message({
                        showClose: true,
                        type: 'warning',
                        message: '标签还没写呢'
                    })
                    return;
                }
                if(this.tagArr.length >= 5){
                    this.tag = '';
                    this.$message({
                        showClose: true,
                        type: 'warning',
                        message: '不能超过5个标签'
                    });
                    return;
                }
                this.$store.dispatch('addTag', this.tag).then(res => {
                    this.tagArr.splice(this.tagArr.length, 0, res.data);
                    this.tag = '';
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '已添加一个标签'
                    })
                })    
            },
            delTag(item, index){
                this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('delTag', item._id).then(res => {
                        this.tagArr.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        }
    }

</script>

<style scoped lang="less">
    @import '../../assets/style/simplemde.min.css';
    .article-warp{
        margin: 0 20px;
        .el-input{
            max-width: 600px;
        }
        .el-button{
            margin: 10px 0;
        }
        .tag {
            .el-input{
                max-width: 506px;
            }
            .el-button{
                margin: 0;
            }
        }
        .tag-list{
            min-height: 56px;
            display: flex;
            flex-wrap: wrap;
            .list-item{
                display: flex;
                justify-content: center;
                align-items: center; 
                margin: 10px;
                margin-left: 0;
                font-size: 16px;
            }
        }
        .btn{
            margin-bottom: 20px;
        }
        
    }
</style>