<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-row>
      <el-col :span="8">
         <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize:10
      },
      total: 0,
      orders: []
    }
  },
  methods: {
    async orderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo})
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.total =  res.data.total
      this.orders = res.data.goods
      // this.queryInfo.pagenum = res.data.pagenum
    }
  },
  created () {
    this.orderList()
  }
}
</script>

<style>

</style>
