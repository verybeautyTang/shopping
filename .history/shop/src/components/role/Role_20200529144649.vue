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
          <el-button type='primary'>添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="getRole" border stripe>
         <el-table-column type="expand">
           <template slot-scope="scope">
             <el-row :class="['bdbottom',index === 0 ? 'bdtop' : '', 'Alignc']" v-for="(item,index) in scope.row.children" :key="item.id">
               <el-col :span="5">
                 <el-tag  closable @close="removeRightById(scope.row, item.id)">{{item.authName}}</el-tag>
                 <i class="el-icon-caret-right"></i>
               </el-col>
               <el-col :span="18">
                 <!-- 通过for循环嵌套，渲染二级权限 -->
                 <el-row :class="[ii === 0 ? ' ': 'bdtop','Alignc']" v-for=" (i,ii) in item.children" :key="i.id">
                   <el-col :span="6">
                     <el-tag closable type="success" @close="removeRightById(scope.row, i.id)">{{i.authName}}</el-tag>
                     <i class="el-icon-caret-right"></i>
                   </el-col>
                   <el-col :span="17" >
                      <el-tag type="warning" class="tagName" v-for="ite in i.children" :key="ite.id" closable  @close="removeRightById(scope.row, ite.id)">{{ite.authName}}</el-tag>
                   </el-col>
                 </el-row>
               </el-col>
             </el-row>
           </template>
         </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column  prop="roleName" label="角色名称"></el-table-column>
        <el-table-column  prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope"><!--  " -->
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showRowList(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限"
      :visible.sync="dialogVisible" @close="sertRighgtclose"
      width="30%">
      <el-tree :data="roleList" :props="roleProp"  show-checkbox default-expand-all :default-checked-keys="defkeys" node-key="id"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightSend">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      getRole: [],
      dialogVisible: false,
      roleList: [],
      roleProp: {
        label: 'authName',
        children: 'children'
      },
      defkeys: []
    }
  },
  methods: {
    // 获取所有角色
    async getRoles () {
      const { data: res } = await this.$http.get('roles')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      } else {
        this.getRole = res.data
        return this.$message.success('获取用户列表成功')
      }
    },
    // 删除权限
    async removeRightById (row, userid) {
      const User = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (User !== 'confirm') {
        this.$message({
          type: 'info',
          message: '取消删除!'
        })
      } else {
        console.log('确认了删除')
        const { data: res } = await this.$http.delete(`roles/${row.id}/rights/${userid}`)
        console.log(userid)
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败')
        } else {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          row.children = res.data
        }
      }
    },
    // 显示角色分配的弹出框
    async showRowList (role) {
      const { data: res } = await this.$http.get('rights/tree')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取失败')
      } else {
        this.roleList = res.data
        this.getRoleShow(role, this.defkeys)
        this.dialogVisible = true
        this.$message.success('获取成功')
      }
    },
    getRoleShow (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      } else {
        node.children.forEach(item => this.getRoleShow(item, arr))
      }
    },
    // 监听对话框的关闭
    sertRighgtclose () {
      this.defkeys = []
    },
    // 点击确定分配权限
    setRightSend () {
      this.dialogVisible = false
    }
  },
  created () {
    this.getRoles()
  }
}
</script>

<style lang="less" scope>
.el-col {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid gainsboro !important;
}
.bdbottom {
  border-bottom: 1px solid gainsboro !important;
}
.Alignc{
  display: flex;
  align-items: center;
}
.tagName{
  margin-left: 2rem;
}
</style>
