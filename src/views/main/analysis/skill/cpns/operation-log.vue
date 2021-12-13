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
              prop="operator_ip"
              label="操作ip"
              width="120"
              align="center"
            />
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
          </el-table>

          <div class="log-pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalCount"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useStore } from '@/store'
import { handleUnixFormat } from '@/utils'

export default defineComponent({
  components: {
    MhCard
  },
  setup() {
    const store = useStore()

    const currentPage = ref(1)
    const totalCount = ref(0)
    const pageSize = ref(10)

    // 组件挂载后发送请求
    onMounted(() => {
      updateOperatorData()
    })

    const updateOperatorData = () => {
      store
        .dispatch('skill/operatorLogAction', {
          offset: (currentPage.value - 1) * pageSize.value,
          limit: pageSize.value
        })
        .then((res) => {
          totalCount.value = res.data.total_count
        })
    }

    const operatorLogData = computed(() => store.state.skill.operatorLog)

    const handleCurrentChange = (pageCount: any) => {
      currentPage.value = pageCount
      updateOperatorData()
    }

    return {
      operatorLogData,
      currentPage,
      totalCount,
      pageSize,
      handleUnixFormat,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less">
.log-content {
  /* height: 400px; */
  width: 100%;
}
.log-pagination {
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  i {
    margin: 0;
    text-align: center;
  }
  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    display: inline;
  }
}
</style>
