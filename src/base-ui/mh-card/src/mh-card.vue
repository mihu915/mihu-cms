<template>
  <div class="mh-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <slot name="title"></slot>
        </div>
      </template>

      <div class="card-content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.box-card {
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(194, 194, 194);
}
.card-header {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  height: 20px;
}
</style>
