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
.warp {
    display: block;
    text-align: center;
    >div {
        text-align: center;
        >a {
            color: #42b983;
            &:active {
                color: #42b983;
            }
            &:visited {
                color: #42b983;
            }
        }
    }
}
</style>
