<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '200px' : '64px'">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @foldChange="foldChange"></nav-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import NavHeader from '@/components/nav-header'
import NavMenu from '@/components/nav-menu'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(true)

    const foldChange = function (isFold: boolean) {
      console.log(isFold)
      isCollapse.value = isFold

      // asideWidth.value = isExpand ? '200px' : '64px'
    }

    return { foldChange, isCollapse }
  }
})
</script>

<style scoped lang="less">
.main {
  height: 100%;
  width: 100%;
}
.el-aside {
  transition: width 0.3s linear;
}
.el-container {
  height: 100%;
  background-color: #f0f2f5;
}
.el-header {
  background-color: #fff;
  height: 40px;
  padding: 0;
  margin: 0;
  box-shadow: 0 -1px 5px #000;
}
</style>
