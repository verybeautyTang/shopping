<template>
<div class="login_container">
  <div class="login_box">
    <div class="avater_img">
      <img src="./../assets/logo.png" alt="">
      </div>
      <el-form :v-model="loginForm" label-width="100px" class="login_form">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="btns">
           <el-button type="primary">登录</el-button>
           <el-button>重置</el-button>
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
      }
    }
  },
  methods: {
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
