<template>
  <div class="widget-panel">
    <p class="widget-panel-title">{{ title }}</p>
    <p class="widget-panel-main">
      <BaseTable :data-source="dataSource" :columns="columns"></BaseTable>
    </p>
  </div>
</template>

<script setup>
import BaseTable from '@/components/base-table/index.vue'
const props = defineProps({
  dataSource: Object,
  columns: Object
})
const title = '湿度监测'
</script>
<style lang="scss" scoped></style>
