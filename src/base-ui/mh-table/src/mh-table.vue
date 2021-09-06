<template>
  <div class="mh-table">
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
  setup() {
    const handleNullData = (data: any) => {
      if (typeof data === undefined || data === null) {
        return '—'
      } else {
        return data
      }
    }
    return {
      handleNullData
    }
  }
})
</script>

<style scoped></style>
