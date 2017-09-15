<template>
    <h1>
        tags</h1>
</template>
<script>
import Api from '../libs/Api'
export default {
    name: 'Tag',
    data(){
        return {

        }
    },
    created(){
        Api.getAllTags().then(res => {
            console.log(res.data);
        })
    }
}
</script>
<style lang="less" scoped>

</style>