<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-alert
    title="注意：只允许第三级分类设置参数"
    type="warning"
    :closable="false">
  </el-alert>
  <el-card>
    <el-row>
      <el-col>
        <span>请选择商品分类：</span>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
