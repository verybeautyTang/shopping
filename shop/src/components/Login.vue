<template>
<div class="login_container">
  <div class="login_box">
    <div class="avater_img">
      <img src="./../assets/logo.png" alt="">
      </div>
      <el-form :model="loginForm" ref="loginFromItem" :rules="loginRule" label-width="100px" class="login_form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
           <el-button type="primary" @click="sendForm">登录</el-button>
           <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 26, message: '长度在 6 到 26 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      console.log(this.$refs)
      this.$refs.loginFromItem.resetFields()
    },
    sendForm () {
      this.$refs.loginFromItem.validate(async valid => {
        console.log(valid)
        if (valid) {
          const { data: res } = await this.$http.post('login', this.loginForm)
          console.log(res)
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg)
            console.log(res.meta.msg)
          } else {
            this.$message.success(res.meta.msg)
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
            console.log(res.meta.msg)
          }
        } else {
          console.log(valid)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped> // scoped 只在组件中生效，没有scoped的话，全局都生效
 html body {
  height:100% ;
  // width: 100%;
  // background-color: #2b4b6b;
}
.login_container{
  background-color: #2b4b6b;
  height: 100%;
    // width: 100%;
}
.login_box{
  width:450px;
  height: 300px;
  background-color: #a0cfff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avater_img {
    width: 130px;
    height: 130px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background-color: #eee;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position:absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #ddd;
    }
  }
  .login_form{
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns {
      display:flex;
      justify-content: flex-end;
    }
  }
}
</style>
