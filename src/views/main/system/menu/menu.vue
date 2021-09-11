<template>
  <div class="system-menu">
    <content-page
      :dialogConfig="menuDialogConfig"
      :contentConfig="menuContentConfig"
      title="菜单管理："
      pageName="menu"
    ></content-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { menuContentConfig } from './config/content.config'
import { menuDialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page/src/content-page.vue'

export default defineComponent({
  components: {
    ContentPage
  },

  setup() {
    return {
      menuContentConfig,
      menuDialogConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
