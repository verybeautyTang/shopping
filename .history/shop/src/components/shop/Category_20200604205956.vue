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
          <el-button type='primary' @click="addCategroy">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table :data="cateList" :columns='columns' :selection-type='false' :expand-type="false" show-index index-text="#" border :show-row-hover="false">
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <template slot="sort"  slot-scope="scope">
          <el-tag  size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini"  v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag  size="mini" type="warning " v-else>三级</el-tag>
        </template>
        <template  slot="opt"> <!--  slot-scope="scope" -->
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 点击添加按钮的弹出框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="showAddCategroy"
        width="50%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="ruleForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <el-cascader
              v-model="selectKey"
              :options="parentList"
              :props="parentListProp"
              @change="ChangeParnteCate"
              clearable>
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showAddCategroy = false">取 消</el-button>
          <el-button type="primary" @click="showAddCategroy = false">确 定</el-button>
        </span>
      </el-dialog>
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
        pagesize: 5
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
      }],
      showAddCategroy: false,
      ruleForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      parentList: [],
      parentListProp: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      selectKey: []
    }
  },
  methods: {
    async getCategroys () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.cateList = res.data.result
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCategroys()
    },
    handleCurrentChange (newNum) {
      this.queryInfo.pagenum = newNum
      this.getCategroys()
    },
    addCategroy () {
      // 先获取父级分类列表再展示对话框
      this.getParentCate()
      this.showAddCategroy = true
    },
    // 获取父级分类的数据列表
    async getParentCate () {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.parentList = res.data
      console.log(this.parentList)
    },
    ChangeParnteCate () {
      console.log(this)
      console.log(this.selectKey)
    }
  },
  created () {
    this.getCategroys()
  }
}
</script>

<style lang="less" scope>
.el-cascader {
  whith:100%;
}
</style>
