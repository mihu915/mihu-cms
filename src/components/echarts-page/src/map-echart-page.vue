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
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          triggerOn: 'click',
          formatter: function (e: any, t: any, n: any) {
            return 0.5 == e.value
              ? e.name + '：有疑似病例'
              : e.seriesName + '<br />' + e.name + '：' + e.value
          }
        },
        visualMap: {
          min: 0,
          max: 60000,
          left: 0,
          bottom: 0,
          showLabel: !0,
          text: ['高', '低'],
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
            max: 1.2
          },
          zoom: 1.23,
          top: 30,
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
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '累计确诊病例',
            type: 'map',
            geoIndex: 0,
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

<style scoped></style>
