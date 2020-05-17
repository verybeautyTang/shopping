<template>
<div class="login_container">
  <div class="login_box">
    <div class="avater_img">
      <img src="./../assets/logo.png" alt="">
      </div>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="年龄"
    prop="age"
    :rules="[
      { required: true, message: '年龄不能为空'},
      { type: 'number', message: '年龄必须为数字值'}
    ]"
  >
    <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</div>
</template>

<script>
export default {
data () {
  return {
     numberValidateForm: {
          age: ''
      }
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
}
</style>
