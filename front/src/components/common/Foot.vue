<template>
    <div class="warp">
        <div>Powered by
            <a href="http://koajs.com/">koa2</a> &
            <a href="https://github.com/Dulmcat/dulm-blog">dulm-blog</a>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
@import "../../assets/style/_setting";
.warp {
    padding: 30px 0;
    border-top: 1px solid @border;
    >div {
        text-align: center;
    }
}
</style>
