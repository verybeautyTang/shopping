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
        <el-table :data="rightsList" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column  prop="authName" label="权限名称"></el-table-column>
        <el-table-column  prop="path" label="路径"></el-table-column>
        <el-table-column  prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
