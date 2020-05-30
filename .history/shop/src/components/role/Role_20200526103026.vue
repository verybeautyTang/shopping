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
          <el-button type='primary'>添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="getRole" border stripe>
        <el-table-column type="index"></el-table-column>
      </el-table>
    </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      getRole: []
    }
  },
  methods: {
    async getRoles () {
      const { data: res } = await this.$http.get('roles')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      } else {
        this.getRole = res.data
        return this.$message.success('获取用户列表成功')
      }
    }
  },
  created () {
    this.getRoles()
  }
}
</script>

<style>

</style>
