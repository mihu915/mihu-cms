<template>
  <div class="operation-log">
    <mh-card>
      <template #title>
        <div>操作日志：</div>
      </template>
      <template #default>
        <div class="log-content">
          <el-table :data="operatorLogData.list" stripe border style="width: 100%" size="mini">
            <el-table-column header-align="center" prop="content" label="操作内容" />
            <el-table-column
              header-align="center"
              prop="operator_time"
              label="操作时间"
              width="180"
              align="center"
            >
              <template #default="scope">
                {{ handleUnixFormat(scope.row.operator_time) }}
              </template>
            </el-table-column>
            <el-table-column
              header-align="center"
              prop="operator_ip"
              label="操作ip"
              width="120"
              align="center"
            />
          </el-table>

          <div class="log-pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              v-model="currentPage"
              :total="operatorLogData.total_count"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </template>
    </mh-card>
  </div>
</template>

<script lang="ts">
import MhCard from '@/base-ui/mh-card/src/mh-card.vue'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { handleUnixFormat } from '@/utils'
export default defineComponent({
  components: {
    MhCard
  },
  setup() {
    const store = useStore()
    const offset = ref(0)
    const limit = ref(10)
    const currentPage = ref(1)

    store.dispatch('skill/operatorLogAction', { offset: offset.value, limit: limit.value })
    const operatorLogData = computed(() => store.state.skill.operatorLog)
    const handleCurrentChange = (pageCount: any) => {
      console.log(pageCount)
      currentPage.value = pageCount
    }
    return {
      operatorLogData,
      currentPage,
      handleUnixFormat,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
.log-content {
  /* height: 400px; */
}
.log-pagination {
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
