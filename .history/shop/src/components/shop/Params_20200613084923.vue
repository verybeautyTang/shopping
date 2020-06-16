<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row>
      <el-col>
         <el-alert
            title="不可关闭的 alert"
            type="success"
            :closable="false">
          </el-alert>
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
