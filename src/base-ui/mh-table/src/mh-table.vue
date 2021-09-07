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
        width="60"
        v-if="tableConfig?.showOtherTableContent?.showSelectColumn"
      ></el-table-column>
      <el-table-column
        type="index"
        label="id"
        align="center"
        width="80"
        v-if="tableConfig?.showOtherTableContent?.showIndexColumn"
      ></el-table-column>

      <template v-for="item of tableConfig.propList" :key="item.id">
        <el-table-column
          v-bind="item"
          :align="item.align || 'center'"
          :resizable="item.resizable || false"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ handleNullData(scope.row[item.prop]) }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="content-footer"></div>
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
    }
  },
  emits: ['handleCreate'],
  setup(props, { emit }) {
    const handleNullData = (data: any) => {
      if (typeof data === undefined || data === null) {
        return '—'
      } else {
        return data
      }
    }

    const handleCreate = () => {
      emit('handleCreate')
    }
    return {
      handleNullData,
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
</style>
