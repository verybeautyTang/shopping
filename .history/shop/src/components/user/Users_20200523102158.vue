<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-card>
        <el-row :gutter="20" >
          <el-col :span="6">
            <div style="margin-top: 15px;">
              <el-input placeholder="请输入内容" clearable class="input-with-select" @clear="UserInfo" v-model="queryInfo.query">
                <el-button slot="append" icon="el-icon-search" @click="UserInfo"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="AddUser">添加用户</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="userList"
          border
          stripe
          style="width: 100% ">
            <el-table-column type="index">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
           <el-table-column
            prop="role_name"
            label="角色">
          </el-table-column>
           <el-table-column label="状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.mg_state" @change="SetChanged(scope.row)" >
                </el-switch>
             </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row.id)" type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button @click="deleteUsers(scope.row.id)" type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-tooltip content="角色分配" placement="top" :enterable ="false">
                <el-button @click="rightUser(scope.row.id)" type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </el-card>
    </div>
      <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" @close="addDialogClose">
      <el-form :model="addForm" :rules="Addrules" ref="AddruleForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendAddUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="editDialogVisible"  @close="editDialogClose">
      <el-form :model="editFrom" :rules="Editrules" ref="EditruleForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editFrom.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editFrom.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editFrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendEditUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        username: ''
      },
      editFrom: {},
      Addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      Editrules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async UserInfo () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('数据获取失败')
      } else {
        this.userList = res.data.users
        this.total = res.data.total
      }
      console.log(res)
    },
    // 监听pageSize
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      console.log(`每页 ${newSize} 条`)
      this.UserInfo()
    },
    // 监听pageNumber
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      console.log(`当前页: ${newPage}`)
      this.UserInfo()
    },
    async SetChanged (userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      console.log(res)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('更新用户状态失败')
      } else {
        return this.$message.success('更新用户状态成功')
      }
    },
    // 新增用户对话框
    AddUser () {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框的关闭事件，重置整个表单
    addDialogClose () {
      this.$refs.AddruleForm.resetFields()
    },
    sendAddUser () {
      this.$refs.AddruleForm.validate(async valid => {
        console.log(valid)
        if (!valid) {
          this.$message.error('添加失败，请完善信息后重试')
        }
        // 成功则开始发起添加新用户的请求
        const { data: res } = await this.$http.post('users', this.addForm)
        console.log(res)
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败')
        } else {
          this.$message.success('添加用户成功')
          this.addDialogVisible = false
          this.UserInfo()
        }
      })
    },
    // 修改用户的对话框
    async editUser (userId) {
      const { data: res } = await this.$http.get('users/' + userId)
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户失败')
      }
      this.editFrom = res.data
      this.editDialogVisible = true
    },
    // 重置修改对话框
    editDialogClose () {
      this.$refs.EditruleForm.resetFields()
    },
    // 修改确定
    sendEditUser () {
      this.$refs.EditruleForm.validate(async valid => {
        console.log(valid)
        if (!valid) {
          return this.$message.error('修改失败，请完善信息后重试')
        } else {
          this.editDialogVisible = false
        }
      })
    },
    deleteUsers (userid) {
      console.log(userid)
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    }
  },
  created () {
    this.UserInfo()
  }
}
</script>

<style lang="less" scoped>
.el-button {
  margin-top: 1rem;
}
.el-row{
  margin-bottom: 30px;
}
</style>
