<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-table :data="rightsList" border>
      <el-table-column type="index"></el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    async getRightList () {
      const { data: res } = await this.$http.get('rights/list')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      } else {
        this.$message.success('获取权限列表成功')
        this.rightsList = res.data
      }
    }
  },
  created () {
    this.getRightList()
  }
}
</script>

<style>

</style>
