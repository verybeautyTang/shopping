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
          <el-tag  size="mini" type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
          <el-tag type="danger" size="mini" v-else >未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">
          {{scope.row.create_time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" @click="showbox" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="success" icon="el-icon-location" size="mini" @click="showMap">地图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog
      title="修改地址"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="address">
          <el-cascader :options="cityDate" v-model="ruleForm.address"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressdetail">
          <el-input v-model="ruleForm.addressdetail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 物流进度对话框 -->
        <el-dialog
      title="物流进度"
      :visible.sync="ProgredialogVisible"
      width="50%"
      @close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="省市区/县" prop="address">
          <el-cascader :options="cityDate" v-model="ruleForm.address"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressdetail">
          <el-input v-model="ruleForm.addressdetail"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
  </div>
</template>

<script>
import cityDate from './citydata'
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orders: [],
      dialogVisible: false,
      ruleForm: {
        address: [],
        addressdetail: ''
      },
      rules: {
        address: [
          { required: true, message: '请选择省市/区县 ', trigger: 'blur' }
        ],
        addressdetail: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      cityDate: cityDate,
      ProgredialogVisible: false,
      progess: []
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
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.orderList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.orderList()
    },
    showbox () {
      this.dialogVisible = true
    },
    handleClose () {
      this.$ref.ruleFormRef.resetFields()
    },
    async showMap () {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.progess = res.data
      this.ProgredialogVisible = true
    }
  },
  created () {
    this.orderList()
  }
}
</script>

<style>

</style>
