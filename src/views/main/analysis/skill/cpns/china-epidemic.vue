<template>
  <div class="china-epidemic">
    <mh-card>
      <template #title>
        <div>全国疫情：</div>
      </template>
      <template #default>
        <el-popover placement="left-start" title="疫情总数据：" :width="200" trigger="hover">
          <template #default>
            <div>
              <div>今日总新增：{{ chinaTodayData.confirm }}</div>
              <div>今日治愈：{{ chinaTodayData.heal }}</div>
              <div>今日死亡：{{ chinaTodayData.dead }}</div>
              <hr />
              <div>累计确诊人数：{{ chinaTotalData.confirm }}</div>
              <div>累计治愈：{{ chinaTotalData.heal }}</div>
              <div>累计死亡：{{ chinaTotalData.dead }}</div>
            </div>
          </template>
          <template #reference>
            <map-echart-page
              :mapData="chinaAreaData"
              :updateTime="epidemicUpdateTime"
              :chinaProvincesData="chinaProvincesData"
            ></map-echart-page>
          </template>
        </el-popover>
      </template>
    </mh-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import MapEchartPage from '@/components/echarts-page'
import MhCard from '@/base-ui/mh-card/src/mh-card.vue'

export default defineComponent({
  components: {
    MapEchartPage,
    MhCard
  },
  setup() {
    const chinaAreaData: any = ref([])
    const chinaTotalData = ref({})
    const chinaTodayData = ref({})
    const epidemicUpdateTime = ref('')
    const chinaProvincesData = ref([])
    const store = useStore()

    store.dispatch('skill/getEpidemicDataAction').then(() => {
      chinaAreaData.value! = store.getters['skill/getTotalConfirmData']
      console.log(chinaAreaData.value)
      epidemicUpdateTime.value = store.state.skill.epidemicData.lastUpdateTime
      chinaTotalData.value = store.state.skill.epidemicData.total
      chinaTodayData.value = store.state.skill.epidemicData.today
      chinaProvincesData.value = store.state.skill.epidemicData.children
    })

    return {
      chinaAreaData,
      epidemicUpdateTime,
      chinaTodayData,
      chinaTotalData,
      chinaProvincesData
    }
  }
})
</script>

<style scoped></style>
