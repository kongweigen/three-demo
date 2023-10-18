<template>
  <div id="bar"></div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('bar')!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }

  option && myChart.setOption(option)
})
</script>
<style scoped></style>
