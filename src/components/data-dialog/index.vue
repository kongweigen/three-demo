<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="80%"
    :close-on-click-modal="false"
  >
    <el-table :data="mockList" style="width: 100%">
      <el-table-column prop="temperature.value" label="温度" />
      <el-table-column prop="humidity.value" label="湿度" />
      <el-table-column prop="air_quality.value" label="空气质量" />
      <el-table-column prop="lighting.value" label="照明" />
      <el-table-column prop="tobacco_storage_condition.value" label="烟草储存条件" />
      <el-table-column prop="tobacco_processing_equipment_status.value" label="烟草加工设备状态" />
      <el-table-column prop="safety_equipment_status.value" label="安全设备状态" />
      <el-table-column prop="power_supply.value" label="电力供应" />
      <el-table-column prop="tobacco_production.value" label="烟草产量" />
      <el-table-column prop="waste_disposal.value" label="废弃物处理" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="visible = false"> 关闭 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useInit } from './useInit'

const { title, visible, show, mockList } = useInit()

defineExpose({ show })
</script>
<style scoped></style>
