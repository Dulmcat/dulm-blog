<template>
    <div class="manage">
        <ul>
            <li v-for="(item, index) in articles">
                <p>{{item.title}}</p>
            </li>
        </ul>
        
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
        this.$store.dispatch('getAllArticles').then(res => {
            this.articles.push(...res.data);
        });
    },
    methods: {
        
    }
}
</script>

<style scoped lang="less">
.manage{
    li{
        font-size: 16px;
    }
}

</style>