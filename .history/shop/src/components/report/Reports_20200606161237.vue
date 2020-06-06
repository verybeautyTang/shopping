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
  mounted () {
     var myChart = echarts.init(document.getElementById('main'));
    //  准备数据和配置项
  }
}
</script>

<style>

</style>
