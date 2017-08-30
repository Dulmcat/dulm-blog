<template>
    <nav>
        <ul>
            <router-link to="/admin/article" tag="li" >
                发布文章
            </router-link>
            <router-link to="/admin/list" tag="li">
                管理文章
            </router-link>
            <router-link to="/admin/tag" tag="li">
                标签管理
            </router-link>
        </ul>
    </nav>
</template>

<script>
export default{
}
</script>
<style lang="less">

</style>