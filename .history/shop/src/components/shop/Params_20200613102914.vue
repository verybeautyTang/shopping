<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-alert
    show-icon
    title="注意：只允许第三级分类设置参数"
    type="warning"
    :closable="false">
  </el-alert>
  <el-card class="el-opt">
    <el-row>
      <el-col>
        <span>请选择商品分类：</span>
        <el-cascader
          v-model="category"
          :options="CateList"
          :props="parentListProp"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>
  </el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      CateList: [],
      category: [],
      parentListProp: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.CateList = res.data
      console.log(this.CateList)
    },
    handleChange () {
      console.log(this.category)
    }
  },
  created () {
    this.getCateList()
  }
}
</script>

<style lang='less' scope>
.el-opt {
  margin-top: 30px;
}
.el-cascader {

}
</style>
