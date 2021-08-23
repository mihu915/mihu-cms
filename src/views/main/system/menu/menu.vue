<template>
  <div class="system-menu">
    <h2 class="menu-title">菜单列表：</h2>

    <div class="menu-content"></div>
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

<style scoped>
.system-menu {
  padding: 20px;
}

.menu-title {
  margin: 0;
}
</style>
