<template>
  <div class="mh-description">
    <el-descriptions :title="descriptionConfig.title" direction="vertical" :column="4" border>
      <template v-if="descriptionConfig.showExtra" #extra>
        <el-button type="primary" @click="handleExtraBtn">{{
          descriptionConfig.operationBtnText
        }}</el-button>
      </template>

      <template v-for="(item, index) of descriptionConfig.desItems" :key="index">
        <el-descriptions-item :label="item.label" align="center">
          <template v-if="item.slotName">
            <slot :name="item.slotName"></slot>
          </template>
          <template v-else>
            {{ data[item.field] || '—' }}
          </template>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    descriptionConfig: {
      type: Object,
      required: true,
      default: () => ({})
    },
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  emits: ['handleExtraBtn'],

  setup(props, { emit }) {
    const handleExtraBtn = () => {
      emit('handleExtraBtn')
    }
    return {
      handleExtraBtn
    }
  }
})
</script>

<style scoped></style>
