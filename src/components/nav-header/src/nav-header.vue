<template>
  <div class="nav-header">
    <div class="fold-btn" @click="handleClickFlex">
      <i
        class="el-icon-s-unfold fold-icon"
        :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      ></i>
    </div>
    <div class="header-item">
      <mh-breadcrumb :breadcrumbs="currentBreadcrumb"></mh-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumb } from '@/utils'

import UserInfo from './user-info.vue'
import MhBreadcrumb from '@/base-ui/mh-breadcrumb'
export default defineComponent({
  components: {
    MhBreadcrumb,
    UserInfo
  },
  emits: ['foldChange'],

  setup(proms, { emit }) {
    const isFold = ref(true)
    const store = useStore()
    const route = useRoute()

    // 动态获取当前的面包屑
    const currentBreadcrumb = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadcrumb(userMenus, currentPath)
    })

    const handleClickFlex = function () {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return { isFold, handleClickFlex, currentBreadcrumb }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  height: 100%;
}
.fold-btn {
  height: 100%;
  line-height: 40px;
  margin: 0 20px;
  font-size: 24px;
  cursor: pointer;
}
.header-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
}
</style>
