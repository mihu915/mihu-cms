<template>
  <div class="skill">
    <div class="skill-header common-Piece">
      <div class="greeting">
        <span>{{ timeInfo.timeFrame }}，</span>
        <span>{{ nickname }}</span>
      </div>
    </div>

    <div class="info-card">
      <el-row :gutter="10">
        <el-col :span="16"> <operation-log></operation-log> </el-col>

        <el-col :span="8">
          <china-epidemic></china-epidemic>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { getNowTimeFrameByUnix } from '@/utils'
import { computed, defineComponent, ref } from 'vue'

import { useStore } from '@/store'

import ChinaEpidemic from './cpns/china-epidemic.vue'
import OperationLog from './cpns/operation-log.vue'

export default defineComponent({
  components: { ChinaEpidemic, OperationLog },
  setup() {
    const store = useStore()
    const nickname = computed(() => store.state.login.userInfo.nickname)
    const timeInfo = ref(getNowTimeFrameByUnix())

    return {
      timeInfo,
      nickname
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
