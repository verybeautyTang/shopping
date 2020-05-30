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
             <el-row :class="['bdbottom',index === 0 ? 'bdtop' : '']" v-for="(item,index) in scope.row.children" :key="item.id">
               <el-col :span="5">
                 <el-tag>{{item.authName}}</el-tag>
               </el-col>
               <el-col :span="19"></el-col>
             </el-row>
           </template>
         </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column  prop="roleName" label="角色名称"></el-table-column>
        <el-table-column  prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column  label="操作">
          <template><!--  slot-scope="scope" -->
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
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

<style lang="less" scope>
.el-col {
  margin: 7px;
}
.bdtop {
  border-top: 1px solild gainsboro;
}
.bdbottom {
  border-top: 1px solild gainsboro;
}
</style>
