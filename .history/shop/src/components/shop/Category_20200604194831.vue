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
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <template slot="sort"  slot-scope="scope">
          <el-tag  size="mini" v-if="scope.row.cat_level === 1">一级</el-tag>
          <el-tag type="success" size="mini"  v-else-if="scope.row.cat_level === 2">二级</el-tag>
          <el-tag  size="mini" type="warning " v-else>三级</el-tag>
        </template>
        <template  slot="opt"> <!--  slot-scope="scope" -->
          <el-button type="parmary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
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
      },
      {
        label: '是否有效',
        type: 'template',
        template: 'isOk'
      },
      {
        label: '排序',
        type: 'template',
        template: 'sort'
      },
      {
        label: '操作',
        type: 'template',
        template: 'opt'
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
