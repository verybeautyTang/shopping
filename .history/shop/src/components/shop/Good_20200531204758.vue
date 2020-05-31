<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
       <el-row style="margin-bottom:30px ">
        <el-col>
          <el-button type='primary'>添加分类</el-button>
        </el-col>
      </el-row>
      <el-table></el-table>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
