<template>
<div class="login_container">
    <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
            <img src="../assets/c01f59644eac0c39c290bbae16b8e416.jpg" alt="">
        </div>
        <!-- 登陆表单区域 -->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="咸鱼是会被淘汰的"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <!-- 怎么在输入框添加键盘事件  @onkeyup.enter="login" -->
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password" suffix-icon="iconfont icon-showpassword" placeholder="所以你怎么还不努力"></el-input><!-- 显示密码的功能还没有 -->
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            // 这是登陆表单的数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            // 这是表单的验证规则
            loginFormRules: {
                username: [
                    { required: true, message: '请输入登陆名称', trigger: 'blur' }, // 失去焦点触发
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登陆密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]

            }
        }
    },
    methods: {
        // 点击重置按钮，重置登陆表单
        resetLoginForm() {
            // console.log(this);
            // 这个部分是element-ui 官网的resetFields 表单重置方法
            this.$refs.loginFormRef.resetFields()
        },
        login() {
            // 先获取到引用对象，那这个对象调用 validate 验证，在 validate 中接收一个回调函数，第一个形参 valid 是x验证的结果是一个布尔值，判断这个布尔值
            this.$refs.loginFormRef.validate(async valid => {
                // console.log(valid);
                // async 和await,要放在一起 -> 这个需要学习下
                if (!valid) return;
                // 返回的data属性才是真实的，其他的都是 axios 封装的
                const { data: res } = await this.$http.post('login', this.loginForm);
                // console.log(res);
                if (res.meta.status !== 200) return this.$message.error('登陆失败！');
                // this.$message.success('登陆成功！'); -> 这个部分是element-ui 官网的message弹窗组件内容
                this.$message.success('登陆成功！');
                // 1. 将登陆之后的 token ，保存到客户端的 sessionStorage 中
                //    1.1 项目中除了登陆之外的其他API接口，必须要在登陆之外才能访问
                //    1.2 token 理应在当前网页打开期间生效，所以将 token 保存在 sessionStorage 中
                window.sessionStorage.setItem('token', res.data.token);
                // 2. 通过编程式导航跳转到后台主页，路由地址是
                this.$router.push("/home");
            })
        }
    }
}
</script>

<style scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;/* 圆角边框 */
    position: absolute;/* 定位 */
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    /* overflow:hidden; */
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);/* 盒子自身的一个位子 */
    background-color: #fff;
}
.avatar_box img{
    top: 20px;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    background-color: #eee;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10px;/* 边距 上下0 左右10 */
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;/* 右边对齐 */
}
</style>
