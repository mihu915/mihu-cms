<template>
  <div class="mh-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :style="style"
        v-for="(item, index) of breadcrumbs"
        :key="index"
        :to="{ path: item.path ?? '' }"
      >
        <span :style="style">
          {{ item.name }}
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../index'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    },
    style: {
      type: Object
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.mh-breadcrumb {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
