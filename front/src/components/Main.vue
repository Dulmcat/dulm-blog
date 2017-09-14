<template>
    <div class="page">
        <v-side></v-side>
        <section>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
            <v-foot></v-foot>
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
@import "./../assets/style/_setting";
.page{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
section{
    position: absolute;
    top: 0;
    left: 300px;
    right: 0;
    bottom: 0;
    min-width: 280px;
    max-width: 1000px;
    margin: 0 30px;
}
@media only screen and (max-width: 500px){
    section{
        position: initial;
        margin: 0 20px;
    }
}

</style>

