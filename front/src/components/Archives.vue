<template>
    <div class="archives">
        <h1>博客归档</h1>
        <ul>
            <li v-for="(item, index) in articles">
                <router-link class="title" :to="'articles/' + item._id">{{item.title}}</router-link>
                <span class="createTime">{{item.createTime}}</span>
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
            list: []
        }
    },
    created() {
        Api.getAllPubArticles().then(res => {
            if (res.data.code === 200) {
                this.articles = res.data.data;
                let listTmp = [];
                let articles = this.articles;
                
                for (let i = 0; i < articles.length - 1; i++) {
                    let flag = this.compare(articles[i].createTime, articles[i + 1].createTime);
                    if (flag) {
                        listTmp.push(articles[i]);
                    }
                }
                console.log(listTmp)
            }
        });
    },
    methods: {
        compare(prev, next) {
            var one = prev.split(" ")[0];
            var two = next.split(" ")[0];
            if (one === two) {
                return true;
            }
            return false;
        }
    }
}
</script>
<style lang="less" scoped>

</style>