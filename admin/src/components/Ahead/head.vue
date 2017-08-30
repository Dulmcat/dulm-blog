<template>
    <header>
        <div class="header-icon">
            <a href="/admin/article">DULMCAT</a>
        </div>
        <div class="header-logout">
            <p @click="logout()">退出</p>
        </div>
    </header>
</template>
<script>
export default {
    methods: {
        logout(){
            this.$confirm('此操作将退出后台系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.commit('TOKEN_DELETE');
                    this.$store.commit('RESET');
                    this.$router.push('/login');
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: '退出成功!'
                    });
                }).catch((error) => {
                    this.$message({
                        showClose: true,
                        type: 'info',
                        message: '已取消退出'
                    });
                    console.log(error);         
                });
        }
    }
}
</script>
<style lang="less">
@import '../../assets/style/_setting';
    a{
        text-decoration: none;
    }
    a:hover{
        color: #333;
        cursor: pointer;
    }
    a:visited{
        color: #333;
    }
    p{
        margin: 0;
    }
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 11;
        background-color: #fff;
        color: #333;
        .header-icon,.header-logout{
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            margin: 0 20px;
            color: #555;
            font-size: 18px;
       }
       .header-logout{
           font-size: 16px;
       }
    }
</style>
