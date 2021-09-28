<template>
  <div class="skill">
    <div class="skill-header common-piece">
      <div class="greeting">
        <span>{{ timeInfo.timeFrame }}，</span>
        <span>{{ nickname }}</span>
      </div>
      <typing-animation></typing-animation>
    </div>

    <div class="info-card">
      <el-row :gutter="10">
        <el-col :span="16">
          <technology-stack></technology-stack>
        </el-col>

        <el-col :span="8">
          <china-epidemic></china-epidemic>
        </el-col>

        <el-col :span="8">
          <project-structure></project-structure>
        </el-col>

        <el-col :span="16">
          <operation-log></operation-log>
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
import TechnologyStack from './cpns/technology-stack.vue'
import ProjectStructure from './cpns/project-structure.vue'
import TypingAnimation from '@/base-ui/typing-animation/src/typing-animation.vue'
import OperationLog from './cpns/operation-log.vue'

export default defineComponent({
  components: { ChinaEpidemic, TechnologyStack, ProjectStructure, TypingAnimation, OperationLog },

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
    line-height: 20px;
    display: flex;
    align-items: baseline;
    .greeting {
      font-size: 20px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .info-card {
    margin-top: 10px;
  }

  .el-col {
    margin-bottom: 10px;
  }
}
</style>
