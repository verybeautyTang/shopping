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
      <tree-table :data="cateList" :columns='columns' :selection-type='false' :expand-type="false" show-index index-text="#" border :show-row-hover="false">

      </tree-table>
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
      total: 0,
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }]
    }
  },
  methods: {
    async getCategroys () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      console.log(res.data.result)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.cateList = res.data.result
    }
  },
  created () {
    this.getCategroys()
  }
}
</script>

<style>

</style>
