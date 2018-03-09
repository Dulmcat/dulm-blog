<template>
    <div class="login-warp">
        <div class="login-main">
            <h1>请登录！</h1>
            <el-input type="text" v-model="username" placeholder="请输入账号"></el-input>
            <el-input type="password" v-model="password" placeholder="请输入密码" @keyup.enter.native="login()"></el-input>
            <el-button type="primary" class="login-btn" @click.stop="login()">登录</el-button>
        </div>
        <canvas ></canvas>
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
        mounted () {
            document.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
            var c = document.getElementsByTagName('canvas')[0],
                x = c.getContext('2d'),
                pr = window.devicePixelRatio || 1,
                w = window.innerWidth,
                h = window.innerHeight,
                f = 90,
                q,
                m = Math,
                r = 0,
                u = m.PI*2,
                v = m.cos,
                z = m.random
            c.width = w*pr
            c.height = h*pr
            x.scale(pr, pr)
            x.globalAlpha = 0.6
            function i(){
                x.clearRect(0,0,w,h)
                q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
                while(q[1].x<w+f) d(q[0], q[1])
            }
            function d(i,j){   
                x.beginPath()
                x.moveTo(i.x, i.y)
                x.lineTo(j.x, j.y)
                var k = j.x + (z()*2-0.25)*f,
                    n = y(j.y)
                x.lineTo(k, n)
                x.closePath()
                r-=u/-50
                x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
                x.fill()
                q[0] = q[1]
                q[1] = {x:k,y:n}
            }
            function y(p){
                var t = p + (z()*2-1.1)*f
                return (t>h||t<0) ? y(p) : t
            }
            document.onclick = i
            document.ontouchstart = i
            i()
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
                            redirectUrl = '/admin';
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
    @import '../assets/style/_setting';
    canvas{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
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
            z-index: 2;
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