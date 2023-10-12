<template>
  <div class="layout">
    <div class="layout-header">{{ appName }}</div>
    <div class="layout-main">
      <div class="left">
        <HumidityPanel></HumidityPanel>
        <HumidityPanel></HumidityPanel>
        <HumidityPanel></HumidityPanel>
      </div>
      <div id="box"></div>
      <div class="right"></div>
    </div>
  </div>
  <DataDialog ref="dataDialogRef"></DataDialog>
</template>
<script setup>
import HumidityPanel from '@/components/humidity-panel/index.vue'
import DataDialog from '@/components/data-dialog/index.vue'
import { useThree } from '@/hooks/useThree'

const { dataDialogRef } = useThree()
const appName = '大型厂房监控平台'
</script>
<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #000;

  .layout-header {
    position: absolute;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 64px;
    padding-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  .layout-main {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background-image: linear-gradient(90deg, #01355059 1px, transparent 1px),
      linear-gradient(0deg, #01355059 1px, transparent 1px);
    background-size: 30px 30px, 30px 30px;
    .left {
      position: absolute;
      left: 20px;
      // top: 70px;
      width: 320px;
      height: inherit;
    }
  }
}
</style>
