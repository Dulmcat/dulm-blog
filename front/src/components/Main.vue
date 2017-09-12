<template>
<div class="page">
    <v-side></v-side>
    <transition name="fade" mode="out-in">
        
    </transition>
    <v-foot></v-foot>
</div>
</template>
<script>
import Vside from './common/Side.vue'
import Vfoot from './common/Foot.vue'
export default {
    name: 'main',
    components: {
        'v-side': Vside,
        'v-foot': Vfoot,
    },
    data() {

    }
}
</script>
<style lang="less" scoped>

</style>

