<template>
  <div class="main">
    <el-container>
      <el-header>
        <nav-header></nav-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-menu></nav-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import NavHeader from '@/components/nav-header/nav-header.vue'
import NavMenu from '@/components/nav-menu/nav-menu.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.main {
  height: 100%;
  width: 100%;
}
.el-container {
  height: 100%;
  background-color: #f0f2f5;
}
.el-header {
  background-color: #fff;
  height: 30px;
}
</style>
