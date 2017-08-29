<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ msg2 }}</h2>
  </div>
</template>

<script>
export default {
    name: 'Hello',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            msg2: 'This is a demo!!!!' 
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
    font-weight: normal;
    text-align: center;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #fe8550;
}
</style>
