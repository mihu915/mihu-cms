<template>
  <div class="mh-table">
    <div class="table-header">
      <div class="title">{{ title }}</div>
      <div class="header-btn">
        <el-button @click="handleCreate" type="primary">新建</el-button>
      </div>
    </div>

    <el-table border v-bind="tableConfig" :data="tableData">
      <el-table-column
        type="selection"
        align="center"
        width="50"
        v-if="tableConfig?.showOtherTableContent?.showSelectColumn"
      ></el-table-column>

      <el-table-column
        type="index"
        label="id"
        align="center"
        width="70"
        v-if="tableConfig?.showOtherTableContent?.showIndexColumn"
      ></el-table-column>

      <template v-for="item of tableConfig.propList" :key="item.id">
        <el-table-column
          v-bind="item"
          :align="item.align || 'center'"
          :resizable="item.resizable || false"
        >
          <template #header>
            <div class="table-content-header">
              <span>{{ item.label }}</span>
              &nbsp;
              <el-icon v-if="item.isShowQuestionFilled">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.questionFilledText"
                  placement="top"
                >
                  <question-filled /> </el-tooltip
              ></el-icon>
            </div>
          </template>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ handleNullData(scope.row[item.prop]) }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="table-footer" v-if="showFooter">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITableConfig } from '../index'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object as PropType<ITableConfig>,
      default: () => ({})
    },
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Object
    },
    totalCount: {
      type: Number
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['handleCreate', 'update:pageSize', 'update:currentPage'],

  setup(props, { emit }) {
    // 将空数据转换为-符号展示
    const handleNullData = (data: any) => {
      if (typeof data === undefined || data === null) {
        return '—'
      } else {
        return data
      }
    }

    // 提交create事件
    const handleCreate = () => {
      emit('handleCreate')
    }

    const handleCurrentChange = (currentPage: any) => {
      emit('update:currentPage', currentPage)
    }

    const handleSizeChange = (pageSize: any) => {
      emit('update:pageSize', pageSize)
    }

    return {
      handleCurrentChange,
      handleNullData,
      handleSizeChange,
      handleCreate
    }
  }
})
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 24px;
  align-items: center;
  line-height: 40px;
  margin-bottom: 10px;
}
.table-footer {
  margin-top: 20px;
  width: 100%;
  text-align: right;
}
.table-content-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
