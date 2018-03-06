<template>
    <nav>
        <ul>
            <router-link to="/admin/article" tag="li" active-class="active" class="aside-list">
                发布文章
            </router-link>
            <router-link to="/admin/list" tag="li" active-class="active" class="aside-list">
                管理文章
            </router-link>
            <router-link to="/admin/tag" tag="li" active-class="active" class="aside-list">
                标签管理
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default{
}
</script>
<style scoped lang="less">
@import '../../assets/style/_setting';
    nav{
        position: fixed;
        width: 150px;
        top: 70px;
        left: 0;
        bottom: 0;
        height: 100%;
        background-color:  #48c0c0;
        color: #fefefe;
        .aside-list{
            height: 60px;
            line-height: 60px;
            font-size: 16px;
            text-align: center;
            cursor: pointer;
            &.active{
                background-color: #363636;
            }
            &:hover{
                background-color: #363636;
            }
        }
    }
</style>