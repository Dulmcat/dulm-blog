<template>
    <div class="login-warp">
        <div class="login-main">
        <h1>欢迎回来！</h1>
            <el-input type="text" v-model="username" placeholder="请输入账号"></el-input>
            <el-input type="password" v-model="password" placeholder="请输入密码" @keydown="show($event)"></el-input>
            <el-button type="primary" class="login-btn" @click.stop="login()">登录</el-button>
        </div>
    </div>
</template>

<script>
import Api from './../../libs/Api'
import router from './../router'
export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login(){
            if(this.username === ''){
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '用户名不能为空!'
                });
                return;
            }
            if(this.password === ''){
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '密码不能为空!'
                });
                return;
            }
            let username = this.username;
            let password = this.password;
            Api.login({'username': username,'password': password}).then(res=>{
                if(res.data.code === 200){
                    if(res.data.token){
                        console.log(res.data);
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '登陆成功!'
                        })
                        router.push('/hello');
                    }else{
                        this.$message({
                            showClose: true,
                            type: 'error',
                            message: '账号或密码错误!'
                        });
                        return;
                    }
                }
            })
        },
        show: function(ev){
            console.log('122') 
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1 {
    font-weight: normal;
    text-align: center;
    margin-bottom: 50px;
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

.login-warp{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-main{
        width: 420px;
        height: 500px;
        .el-input{
            width: 80%;
            display: block;
            margin: 10px auto;
        }
        .el-button{
            width: 80%;
            display: block;
            margin: 10px auto;
        }
    }
}
</style>
