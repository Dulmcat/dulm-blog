<template>
    <div class="warp">
        <div class="main">
            <div class="avatar">
                <router-link to="/main/about">
                    <img src="./../../assets/avatar.jpg" alt="头像">
                </router-link>
            </div>
            <div class="list">
                <ul>
                    <router-link to="/main/index" tag="li" active-class="active" class="list-item">首页</router-link>
                    <router-link to="/main/archives" tag="li" active-class="active" class="list-item">归档</router-link>
                    <router-link to="/main/tags" tag="li" active-class="active" class="list-item">标签</router-link>
                    <router-link to="/main/about" tag="li" active-class="active" class="list-item">关于我</router-link>
                </ul>
            </div>
        </div>
        <div class="pic-tag">
            背景图片来自
            <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=64414444">夏の終わり</a> <br> 如有侵权，联系立删
        </div>
    </div>
</template>
<script>
export default {
    // TODO 通过当前url确定list的active颜色

}
</script>
<style lang="less" scoped>
ul {
    list-style: none;
    font-size: 0;
    margin: 0;
    padding: 0;
    li {
        font-size: 18px;
        margin: 20px 0;
        text-align: center;
        color: #f0f0f0;
        cursor: pointer;
    }
}

.warp {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("./../../assets/bg0.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 10px #181830;
    .avatar {
        width: 100%;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 5px solid #f0f0f0;
            box-shadow: 0 0 5px #181830;
        }
    }
    .list {
        ul {
            .list-item {
                &:hover {
                    color: #48c0c0;
                }
                &.active{
                    color: #48c0c0;
                }
            }
        }
    }
    .pic-tag {
        position: absolute;
        bottom: 10px;
        font-size: 10px;
        color: #f0f0f0;
        text-align: center;
        >a {
            color: #48c0c0;
            &:active {
                color: #48c0c0;
            }
            &:visited {
                color: #48c0c0;
            }
        }
    }
}
</style>
