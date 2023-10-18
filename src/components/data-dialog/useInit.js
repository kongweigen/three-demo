import { ref } from 'vue'
import { ElMessage } from 'element-plus'


export const useInit = () => {
  const visible = ref(false)
  const title = ref('')

  const show = (id) => {
    // ElMessage.info(`你选中了厂房 ${id}`)
    title.value = `厂房 ${id}数据概览`
    visible.value = true
  }

  const mockList = [
    {
      "temperature": {
        "indicator": "温度",
        "value": "25.3°C",
        "unit": "°C",
        "timestamp": "2022-01-01 08:00"
      },
      "humidity": {
        "indicator": "湿度",
        "value": "60.2%",
        "unit": "%",
        "timestamp": "2022-01-01 08:00"
      },
      "air_quality": {
        "indicator": "空气质量",
        "value": "25.6AQI",
        "unit": "AQI",
        "timestamp": "2022-01-01 08:00"
      },
      "lighting": {
        "indicator": "照明",
        "value": "正常",
        "unit": "-",
        "timestamp": "2022-01-01 08:00"
      },
      "tobacco_storage_condition": {
        "indicator": "烟草存储条件",
        "value": "合格",
        "unit": "-",
        "timestamp": "2022-01-01 08:00"
      },
      "tobacco_processing_equipment_status": {
        "indicator": "烟草加工设备状态",
        "value": "正常运行",
        "unit": "-",
        "timestamp": "2022-01-01 08:00"
      },
      "safety_equipment_status": {
        "indicator": "安全设备状态",
        "value": "正常",
        "unit": "-",
        "timestamp": "2022-01-01 08:00"
      },
      "power_supply": {
        "indicator": "供电",
        "value": "正常",
        "unit": "-",
        "timestamp": "2022-01-01 08:00"
      },
      "tobacco_production": {
        "indicator": "烟草产量",
        "value": "1000kg",
        "unit": "kg",
        "timestamp": "2022-01-01 08:00"
      },
      "waste_disposal": {
        "indicator": "废物处理",
        "value": "符合要求",
        "unit": "-",
        "timestamp": "2022-01-01 08:00"
      }
    }
  ]

  return {
    title,
    visible,
    show,
    mockList
  }
}