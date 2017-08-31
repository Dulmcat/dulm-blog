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
                    <p>{{item}}</p>
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
        name: 'Hello',
        data() {
            return {
                title: '',
                tag: '',
                tagArr: ['123','456789123456798'],
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
            min-height: 45px;
            display: flex;
            flex-wrap: wrap;
            .list-item{
                display: flex;
                justify-content: center;
                align-items: center; 
                margin: 10px;
                margin-left: 0;
                padding: 8px 15px;
                border: 1px solid #999;
                border-radius: 4px;
                font-size: 16px;
                cursor: pointer;
            }
        }
        .btn{
            margin-bottom: 20px;
        }
        
    }
</style>