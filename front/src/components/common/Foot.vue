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
    width: 1100px;
    display: block;
    text-align: center;
    position: absolute;
    left: 300px;
    bottom: 20px;
    right: 0;
    >div {
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
