<template>
  <div class="humidity-panel">
    <WidgetPanel :data-source="dataSource" :columns="columns"></WidgetPanel>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { dataSource, columns } from './constant'
import WidgetPanel from '@/components/widget-panel/index.vue'

const title = '湿度监测'
</script>
<style lang="scss" scoped></style>
