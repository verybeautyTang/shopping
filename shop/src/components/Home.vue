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
        <el-aside :width="isCollapse? '64px' :'200px'" style="background-color:#333744">
          <div class="toggle_button" @click="toggleCollage">|||</div>
          <el-menu  background-color="#333744" text-color="#fff" :collapse="isCollapse" active-text-color="#409eff" unique-opened :collapse-transition="false" router>
            <el-submenu v-for="items in menulist" :key="items.id"  :index="items.id" >
              <template slot="title">
                <i :class="titleC[items.id]"></i><span>{{items.authName}}</span>
              </template>
                <el-menu-item :index="'/'+ item.path" v-for="item in items.children" :key="item.id">
                    <template slot="title">
                        <i class="el-icon-menu"></i>{{item.authName}}
                    </template></el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      titleC: {
        125: 'el-icon-user',
        103: 'el-icon-edit',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform'
      },
      isCollapse: false
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
    },
    // 点击按钮切换菜单的折叠与展开
    toggleCollage () {
      this.isCollapse = !this.isCollapse
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
  .el-menu {
    border-right: none;
  }
  .toggle_button{
    background-color:#4A5064;
    color: #FFF;
    line-height: 20px;
    text-align: center;
    font-size: 10px;
    letter-spacing: 0.2rem;
    cursor: pointer;
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>
