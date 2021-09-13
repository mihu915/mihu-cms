<template>
  <div class="mh-echarts">
    <div class="china-map" ref="chinaMap" style="width: 400px; height: 350px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watchEffect } from 'vue'

import useEchart from '../hooks/useEchart'

export default defineComponent({
  setup() {
    const chinaMap = ref()

    const options = computed(() => {
      return {
        title: {
          text: '中国疫情图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['确诊数']
        },
        visualMap: {
          type: 'piecewise',
          pieces: [
            { min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28' },
            { min: 500, max: 999, label: '确诊500-999人', color: '#4e160f' },
            { min: 100, max: 499, label: '确诊100-499人', color: '#974236' },
            { min: 10, max: 99, label: '确诊10-99人', color: '#ee7263' },
            { min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7' }
          ],
          color: ['#E0022B', '#E09107', '#A3E00B']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        roamController: {
          show: true,
          left: 'right',
          mapTypeControl: {
            china: true
          }
        },
        series: [
          {
            name: '确诊数',
            type: 'map',
            map: 'china',
            roam: false,
            label: {
              show: true,
              color: 'rgb(249, 249, 249)'
            },
            data: [
              {
                name: '北京',
                value: 212
              },
              {
                name: '天津',
                value: 60
              },
              {
                name: '上海',
                value: 208
              },
              {
                name: '重庆',
                value: 337
              },
              {
                name: '河北',
                value: 126
              },
              {
                name: '河南',
                value: 675
              },
              {
                name: '云南',
                value: 117
              },
              {
                name: '辽宁',
                value: 74
              },
              {
                name: '黑龙江',
                value: 155
              },
              {
                name: '湖南',
                value: 593
              },
              {
                name: '安徽',
                value: 480
              },
              {
                name: '山东',
                value: 270
              },
              {
                name: '新疆',
                value: 29
              },
              {
                name: '江苏',
                value: 308
              },
              {
                name: '浙江',
                value: 829
              },
              {
                name: '江西',
                value: 476
              },
              {
                name: '湖北',
                value: 13522
              },
              {
                name: '广西',
                value: 139
              },
              {
                name: '甘肃',
                value: 55
              },
              {
                name: '山西',
                value: 74
              },
              {
                name: '内蒙古',
                value: 34
              },
              {
                name: '陕西',
                value: 142
              },
              {
                name: '吉林',
                value: 42
              },
              {
                name: '福建',
                value: 179
              },
              {
                name: '贵州',
                value: 56
              },
              {
                name: '广东',
                value: 797
              },
              {
                name: '青海',
                value: 15
              },
              {
                name: '西藏',
                value: 1
              },
              {
                name: '四川',
                value: 282
              },
              {
                name: '宁夏',
                value: 34
              },
              {
                name: '海南',
                value: 79
              },
              {
                name: '台湾',
                value: 10
              },
              {
                name: '香港',
                value: 15
              },
              {
                name: '澳门',
                value: 9
              }
            ]
          }
        ]
      }
    })
    onMounted(() => {
      const echart = useEchart(chinaMap.value!)

      watchEffect(() => {
        echart.setOptions(options.value!)
      })
    })
    return {
      chinaMap,
      options
    }
  }
})
</script>

<style scoped></style>
