<template>
    <div class="login-warp">
        <div class="login-main">
            <h1>欢迎回来！</h1>
            <el-input type="text" v-model="username" placeholder="请输入账号"></el-input>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
            <el-button type="primary" class="login-btn" @click.stop="login()">登录</el-button>
        </div>
    </div>
</template>

<script>
    import Api from './../libs/Api'
    import router from './../router'
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login() {
                if (this.username === '') {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '用户名不能为空!'
                    });
                    return;
                }
                if (this.password === '') {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '密码不能为空!'
                    });
                    return;
                }
                let username = this.username;
                let password = this.password;
                this.$store.dispatch('createToken', { username, password }).then(res => {
                    if (res.token) {
                        let redirectUrl = '';
                        if (this.$route.query.redirect) {
                            redirectUrl = decodeURIComponent(this.$route.query.redirect);
                        } else {
                            redirectUrl = '/hello';
                        }
                        this.$router.push({
                            path: redirectUrl
                        });
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '登录成功!'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            type: 'error',
                            message: res.msg
                        });
                    }
                }).catch(err => {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '登录失败!'
                    });
                });
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    body {
        margin: 0;
        padding: 0;
    }

    .login-warp {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-main {
            width: 420px;
            height: 500px;
            h1 {
                font-weight: normal;
                text-align: center;
                margin-bottom: 50px;
            }
            .el-input {
                width: 80%;
                display: block;
                margin: 10px auto;
            }
            .el-button {
                width: 80%;
                display: block;
                margin: 10px auto;
            }
        }
    }
</style>