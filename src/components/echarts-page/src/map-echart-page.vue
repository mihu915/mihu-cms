<template>
  <div class="map-echart-page">
    <mh-echarts :options="option"></mh-echarts>
  </div>
</template>

<script lang="ts">
import mhEcharts from '@/base-ui/mh-echarts/src/mh-echarts.vue'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  components: { mhEcharts },
  props: {
    mapData: {
      type: Array,
      default: () => []
    },
    updateTime: {
      type: String,
      default: ''
    },
    chinaProvincesData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        title: {
          subtext: `数据来源：网易\n \n上次更新时间：${props.updateTime}`
        },
        tooltip: {
          formatter: function (e: any) {
            if (e.name === '南海诸岛') return
            const data: any = props.chinaProvincesData.find((item: any) => {
              if (item.name === e.name) {
                return item
              }
            })
            return (
              e.name +
              '</br>' +
              e.seriesName +
              '：' +
              e.value +
              '</br>' +
              '累计死亡：' +
              data.total.dead +
              '</br>' +
              '累计治愈：' +
              data.total.heal +
              '</br>' +
              '<hr>' +
              '今日新增：' +
              data.today.confirm +
              '</br>' +
              '今日死亡：' +
              data.today.dead +
              '</br>' +
              '今日治愈：' +
              data.today.heal +
              '</br>'
            )
          }
        },
        visualMap: {
          min: 0,
          max: 70000,
          left: 0,
          bottom: 0,
          showLabel: !0,

          text: ['累计确诊病例'],
          pieces: [
            {
              gt: 10000,
              label: '> 10000人',
              color: '#7f1100'
            },
            {
              gte: 2000,
              lte: 4000,
              label: '2000 - 4000人',
              color: '#cf2e15'
            },
            {
              gte: 1000,
              lte: 2000,
              label: '1000 - 2000人',
              color: '#f05d47'
            },
            {
              gte: 100,
              lte: 1000,
              label: '100 - 1000人',
              color: '#f88876'
            },
            {
              lt: 100,
              label: '< 100人',
              color: '#ffb0a3'
            }
          ],
          show: !0
        },
        geo: {
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 0.6,
            max: 1
          },
          zoom: 1.23,
          top: 40,
          left: 40,
          label: {
            show: !0,
            fontSize: '10',
            color: 'rgba(0,0,0,0.7)'
          },
          itemStyle: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
            // shadowBlur: 50
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#ffe4be',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '累计确诊',
            type: 'map',
            geoIndex: 0,
            groupId: 1,
            data: props.mapData
          }
        ]
      }
    })

    return {
      option
    }
  }
})
</script>

<style scoped>
div {
  color: #ffe4be;
}
</style>
