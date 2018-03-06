<template>
    <div class="archives">
        <h1>博客归档</h1>
        <ul>
            <li class="list" v-for="item in articles" :key="item.id">
                <router-link class="title" :to="'articles/' + item._id">{{item.title}}</router-link>
                <span class="create-time">{{item.createTime}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import Api from '../libs/Api'
export default {
    name: 'Archives',
    data() {
        return {
            articles: [],
        }
    },
    created() {
        Api.getAllPubArticles().then(res => {
            if (res.data.code === 200) {
                this.articles = res.data.data;
            }
        });
    },
    methods: {
        
    }
}
</script>
<style lang="less">
@import "../assets/style/_setting";
.archives{
    .list{
        line-height: 2;
        font-size: 18px;
        .create-time{
            color: @note;
            font-size: 16px;
        }
    }
}

</style>