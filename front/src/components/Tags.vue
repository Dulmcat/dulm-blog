<template>
    <div class="tags">
        <h1>标签</h1>
        <ul class="tag-list">
            <li v-for="i in tags" @click="tagSearch(i)" :key="i.id">{{i.name}}</li>
        </ul>
        <br>
        <ul class="search-list" v-show="this.articles.length !== 0">
            <h2 class="search-title">标签
                <span class="click-tag"> {{ clickTag }} </span>下的文章
            </h2>
            <li v-for="item in articles" :key="item.id">
                <h1 class="title">
                    <router-link tag="span" :to="'articles/' + item._id">{{item.title}}</router-link>
                </h1>
                <div class="create-time">{{item.createTime}}</div>
                <p class="abstract" v-html="mark(item.abstract || '')">...</p>
                <p class="read-all">
                    <router-link tag="span" :to="'articles/' + item._id">查看全文</router-link>
                </p>
            </li>
        </ul>
        <div class="pagination"  v-show="this.articles.length !== 0">
            <router-link tag="span" to="archives">博客归档</router-link>
        </div>
    </div>
</template>
<script>
import Api from '../libs/Api'
import marked from 'marked'
export default {
    name: 'Tag',
    data() {
        return {
            tags: [],
            articles: [],
            clickTag: ''
        }
    },
    created() {
        Api.getAllTags().then(res => {
            if (res.data.code === 200) {
                this.tags = res.data.data;
            }
        })
    },
    methods: {
        mark(value) {
            return marked(value);
        },
        tagSearch(i) {
            this.clickTag = i.name;
            Api.getArticlesByTagId(i._id).then(res => {
                if (res.data.code === 200) {
                    this.articles = res.data.data;
                }
            })
        }
    }
}
</script>
<style lang="less">
@import "../assets/style/_setting";
.tags {
    .tag-list {
        li {
            display: inline-block;
            padding: 8px 15px;
            margin: 10px;
            font-size: 14px;
            font-weight: 100;
            color: @green;
            border: 1px solid @green;
            border-radius: 4px;
            cursor: pointer;
            transition: color .2s cubic-bezier(.4, .01, .165, .99), border .2s cubic-bezier(.4, .01, .165, .99);
            &:hover {
                color: @greener;
                border: 1px solid @greener;
            }
        }
    }
    .search-list {
        border-top: 1px solid @border;
        .search-title {
            background-color: @bgc;
            margin-bottom: 0;
            text-align: center;
            padding: 10px;
            .click-tag{
                color: @green;
            }
        }
        >li {
            border-bottom: 1px solid @border;
            .title {
                span {
                    border-bottom: 2px solid transparent;
                    cursor: pointer;
                    &:hover {
                        color: @green;
                        border-bottom: 2px solid @green;
                        transition: .25s;
                    }
                }
            }
            .create-time {
                color: @note;
            }
            .abstract {
                line-height: 1.5;
            }
            .read-all {
                span {
                    color: @green;
                    cursor: pointer;
                }
            }
        }
    }
    .pagination{
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: @green;
        cursor: pointer;
    }
}
</style>