<template>
    <div class="page">
        <v-header></v-header>
        <v-side></v-side>
        <section>  
            <transition name="slide">
                <keep-alive><router-view></router-view></keep-alive>
            </transition>
        </section>
    </div>
</template>
<script>
import Aheader from './Ahead/head.vue'
import Aside from './Aside/side.vue'
export default {
    components: {
        'v-header': Aheader,
        'v-side': Aside
    }
}
</script>
<style scoped lang="less">
@import '../assets/style/_setting';
.slide-enter-active{
    transition: all .2s ease;
}
.slide-enter{
    transform: translateX(300px);
}
.slide-leave-active{
    opacity: 0;
}
.page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    section{
        position: absolute;
        min-width: 600px;
        top: 70px;
        left: 160px;
        right: 0;
        bottom: 0;
        background-color: #fff;
        overflow: hidden;
    }
}
</style>