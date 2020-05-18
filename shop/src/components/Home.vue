<template>
  <div>
    <el-container class="home_container">
      <el-header>
        <div class="home_header">
          <img src="./../assets/logo.png" alt width="15%" />
          <span>电商后台管理系统</span>
        </div>
        <el-button class="logout" type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color:#333744">
          <el-menu :default-openeds="['1', '3']"  style="background-color:#333744">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>导航一
              </template>
                <el-menu-item index="1-1">
                    <template slot="title">
                        <i class="el-icon-message"></i>导航一
                    </template></el-menu-item>
                <el-menu-item index="1-2"><i class="el-icon-message"></i>选项2</el-menu-item>
                <el-menu-item index="1-3"><i class="el-icon-message"></i>选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menulist: []
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取左侧的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else {
        this.menulist = res.data
        return this.$message.success(res.meta.msg)
      }
    }
  },
  created () {
    this.getMenuList()
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 97vh;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    > span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
