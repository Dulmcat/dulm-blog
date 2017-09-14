<template>
<div class="warp">
    <h1>{{article.title}}</h1>
    <p>{{article.createTime}}</p>
    <div v-html="maked(article.content)"></div>
</div>
    
</template>
<script>
import marked from 'marked'
import Api from '../libs/Api'
export default {
    name: 'hello',
    data() {
        return {
            article: {}
        }
    },
    created(){
        Api.getSingleArticle(this.$route.params.id).then(res => {
            console.log(res.data);
            if(res.data.code === 200){
                this.article = res.data.data;
            }
        })
    },
    methods: {
        maked(value){
            return marked(value);
        },
    }
}
</script>
<style lang="less" scoped>

</style>
