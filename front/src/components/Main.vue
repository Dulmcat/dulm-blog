<template>
    <div class="page">
        <v-side></v-side>
        <v-foot></v-foot>
        <section>
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
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
    }
}
</script>
<style lang="less" scoped>
section{
    position: absolute;
    top: 0;
    left: 320px;
    right: 0;
}

</style>

