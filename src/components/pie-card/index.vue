<template>
  <div id="pie"></div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('pie')!
  var myChart = echarts.init(chartDom)
  var option: EChartsOption

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '数据一' },
          { value: 735, name: '数据二' },
          { value: 580, name: '数据三' },
          { value: 484, name: '数据四' },
          { value: 300, name: '数据五' }
        ]
      }
    ]
  }

  option && myChart.setOption(option)
})
</script>
<style scoped></style>
