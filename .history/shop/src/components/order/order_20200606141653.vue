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
    <el-table :data="orders" border>
       <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单号"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款">
        <template slot-scope="scope">
          <el-tag  size="mini" type="warning" v-if="scope.row.pay_status === '1'">未付款</el-tag>
          <el-tag type="success" size="mini"  v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="order_number" label="下单时间"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orders: []
    }
  },
  methods: {
    async orderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.total = res.data.total
      this.orders = res.data.goods
      console.log(res.data)
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
