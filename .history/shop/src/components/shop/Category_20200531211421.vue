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
  data () {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 2
      },
      cateList: [],
      total: 0
    }
  },
  methods: {
    async getCategroys () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.cateList = res.data
    }
  },
  created () {
    this.getCategroys()
  }
}
</script>

<style>

</style>
