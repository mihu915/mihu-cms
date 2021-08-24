<template>
  <div class="mh-table">
    <el-table border v-bind="tableConfig.tableAttributes">
      <el-table-column
        type="selection"
        align="center"
        width="60"
        v-if="tableConfig.showOtherTableContent.showSelectColumn"
      ></el-table-column>
      <el-table-column
        type="index"
        label="id"
        align="center"
        width="80"
        v-if="tableConfig.showOtherTableContent.showIndexColumn"
      ></el-table-column>

      <template v-for="(item, index) of tableConfig.propList" :key="index">
        <el-table-column
          v-bind="item"
          :align="item.align || 'center'"
          :resizable="item.resizable || false"
        >
          <template v-if="item.isSlot" #default="scope">
            <el-button
              @click="handleClick(scope.row, item.emitEventName)"
              type="text"
              size="small"
              v-for="(item, index) of item.operation"
              :key="index"
              :icon="item.icon"
              >{{ item.textContent }}</el-button
            >
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
    tableConfig: {
      type: Object as PropType<ITableConfig>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const handleClick = (row: any, emitEventName: string) => {
      emit(emitEventName, row)
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped></style>
