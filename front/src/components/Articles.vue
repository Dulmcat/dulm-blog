<template>
    <div class="warp">
        <h1>{{article.title}}</h1>
        <p class="create-time">{{article.createTime}}</p>
        <div v-html="mark(article.content || '')"></div>
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
    created() {
        Api.getSingleArticle(this.$route.params.id).then(res => {
            if (res.data.code === 200) {
                this.article = res.data.data;
            }
        })
    },
    methods: {
        mark(value) {
            return marked(value);
        }
    }
}
</script>
<style lang="less" scoped>
@import "../assets/style/_setting";
.create-time{
    color: @note;
}
</style>
