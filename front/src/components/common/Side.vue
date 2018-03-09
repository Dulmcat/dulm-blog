<template>
    <div class="warp">
        <div class="main">
            <div class="avatar">
                <router-link to="/blog/about">
                    <img src="../../assets/avatar.jpg" alt="头像">
                </router-link>
            </div>
            <div class="list">
                <ul>
                    <router-link to="/blog/index" tag="li" active-class="active" class="list-item">首页</router-link>
                    <router-link to="/blog/archives" tag="li" active-class="active" class="list-item">归档</router-link>
                    <router-link to="/blog/tags" tag="li" active-class="active" class="list-item">标签</router-link>
                    <router-link to="/blog/about" tag="li" active-class="active" class="list-item">关于我</router-link>
                </ul>
            </div>
        </div>
        <div class="pic-tag">
            背景图片来自
            <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=64414444" target="_blank">夏の終わり</a> <br> 如有侵权，联系立删
        </div>
    </div>
</template>
<script>
export default {
    // TODO 通过当前url确定list的active颜色

}
</script>
<style lang="less" scoped>
@import '../../assets/style/_setting';
.warp {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*background-image: url("./../../assets/bg0.jpg");*/
    background-image: url("http://ogvnmzuxx.bkt.clouddn.com/backimg0.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 10px @black;
    .avatar {
        width: 100%;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 5px solid @white;
            box-shadow: 0 0 5px @black;
            &:hover{
                border: 5px solid @green;
                transition: all 0.5s ease;
            }
        }
    }
    .list {
        ul {
            .list-item {
                font-size: 18px;
                margin: 20px 0;
                text-align: center;
                color: @white;
                cursor: pointer;
                &:hover {
                    color: @green;
                    transition: .5s;
                }
                &.active {
                    color: @green;
                }
            }
        }
    }
    .pic-tag {
        position: absolute;
        bottom: 10px;
        font-size: 10px;
        color: @white;
        text-align: center;
        >a {
            color: @green;
            &:active {
                color: @green;
            }
            &:visited {
                color: @green;
            }
        }
    }
}

@media only screen and (max-width: 500px) {
    .warp {
        width: 100%;
        height: 139px;
        position: initial;
        top: 0;
        z-index: 3;
        .avatar {
            margin: 10px 0;
            text-align: center;
            img{
                width: 75px;
                height: 75px;
            }
        }
        .list {
            ul {
                margin: 10px 0;
                .list-item{
                    display: inline-block;
                    margin: 0 10px;
                }
            }
        }
        .pic-tag{
            display: none;
        }
    }
}
</style>
