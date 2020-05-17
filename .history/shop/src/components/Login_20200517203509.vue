<template>
<div class="login_container">
  <div class="login_box">
    <div class="avater_img">
      <img src="./../assets/logo.png" alt="">
      </div>
  </div>
</div>
</template>

<script>
export default {

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
  background-color: blue;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avater_img {
    widows: 130px;
    height: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
