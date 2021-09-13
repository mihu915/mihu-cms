<template>
  <div class="skill">
    <div class="skill-header common-Piece">
      <div class="greeting">
        <span>{{ timeInfo.timeFrame }}~ </span>
        <span>{{ nickname }}</span>
      </div>
    </div>

    <mh-echarts></mh-echarts>
  </div>
</template>

<script lang="ts">
import { getNowTimeFrameByUnix } from '@/utils'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

import mhEcharts from '@/base-ui/mh-echarts/src/mh-echarts.vue'

export default defineComponent({
  components: { mhEcharts },
  setup() {
    const store = useStore()
    const chinaMap = ref()

    const timeInfo = ref(getNowTimeFrameByUnix())
    const nickname = computed(() => store.state.login.userInfo.nickname)

    store.dispatch('skill/getEpidemicDataAction')
    const chinaEpidemicData = computed(() => store.getters['skill/getChinaTotalExtData'])
    setTimeout(() => {
      console.log(chinaEpidemicData.value)
    }, 1000)
    return {
      timeInfo,
      nickname,
      chinaMap
    }
  }
})
</script>

<style scoped lang="less">
.skill {
  .skill-header {
    color: #444;
    line-height: 18px;
    .greeting {
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
</style>
