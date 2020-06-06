<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
     <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  created () {

  },
  // 这时页面上的元素已经被渲染完毕勒
  async mounted () {
    var myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error(res.meta.msg)
    }
    //  准备数据和配置项

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(res.data)
  }
}
</script>

<style>

</style>
