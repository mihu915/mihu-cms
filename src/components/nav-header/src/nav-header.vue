<template>
  <div class="nav-header">
    <div class="fold-btn" @click="handleClickFlex">
      <i
        class="el-icon-s-unfold fold-icon"
        :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
export default defineComponent({
  emits: ['foldChange'],

  setup(proms, { emit }) {
    const isFold = ref(true)
    const handleClickFlex = function () {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return { isFold, handleClickFlex }
  }
})
</script>

<style scoped>
.nav-header {
  display: flex;
  height: 100%;
}
.fold-btn {
  height: 100px;
  line-height: 40px;
  margin-left: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>
