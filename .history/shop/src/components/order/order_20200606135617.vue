<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-input placeholder="请输入内容" >
      <el-button icon="el-icon-search"></el-button>
    </el-input>
  </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
