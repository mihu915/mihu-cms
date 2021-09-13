<template>
  <div class="skill">
    <div class="skill-header common-Piece">
      <div class="greeting">
        <span>晚上好，</span>
        <span>{{ nickname }}</span>
      </div>
    </div>

    <div class="info-card">
      <el-row :gutter="10">
        <el-col :span="16">
          <mh-card>
            <template #title>
              <div>最新消息</div>
            </template>
            <template #default> 123123123123 </template>
          </mh-card>
        </el-col>

        <el-col :span="8">
          <mh-card>
            <template #title>
              <div>全国疫情</div>
            </template>
            <template #default>
              <map-echart-page :mapData="chinaAreaData"></map-echart-page>
            </template>
          </mh-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { getNowTimeFrameByUnix } from '@/utils'
import { computed, defineComponent, ref } from 'vue'

import MhCard from '@/base-ui/mh-card/src/mh-card.vue'
import MapEchartPage from '@/components/echarts-page'
import { useStore } from '@/store'

export default defineComponent({
  components: { MhCard, MapEchartPage },
  setup() {
    const store = useStore()
    const chinaMap = ref()

    const timeInfo = ref(getNowTimeFrameByUnix())
    const nickname = computed(() => store.state.login.userInfo.nickname)
    const chinaAreaData: any = ref([])
    store.dispatch('skill/getEpidemicDataAction').then(() => {
      chinaAreaData.value! = store.getters['skill/getChinaAreaData']
    })

    return {
      timeInfo,
      nickname,
      chinaMap,
      chinaAreaData
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
  .info-card {
    margin-top: 10px;
  }
}
</style>
