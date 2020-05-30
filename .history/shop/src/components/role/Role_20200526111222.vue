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
                 <el-tag closable>{{item.authName}}</el-tag>
                 <i class="el-icon-caret-right"></i>
               </el-col>
               <el-col :span="18">
                 <!-- 通过for循环嵌套，渲染二级权限 -->
                 <el-row :class="[ii === 0 ? ' ': 'bdtop']" v-for=" (i,ii) in item.children" :key="i.id">
                   <el-col :span="6">
                     <el-tag closable type="success">{{i.authName}}</el-tag>
                     <i class="el-icon-caret-right"></i>
                   </el-col>
                   <el-col :span="17">
                      <el-tag type="warning" class="tagName" v-for="ite in i.children" :key="ite.id" closable>{{ite.authName}}</el-tag>
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
  border-top: 1px solid gainsboro !important;
}
.bdbottom {
  border-bottom: 1px solid gainsboro !important;
}
.tagName{
  padding-left: 20px;
}
</style>
