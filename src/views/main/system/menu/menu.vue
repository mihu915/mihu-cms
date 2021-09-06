<template>
  <div class="system-menu">
    <content-page
      :contentConfig="menuContentConfig"
      title="菜单管理："
      pageName="menu"
      @handleCreate="handleCreate"
    ></content-page>

    <form-dialog v-model="showDialog" :dialogConfig="dialogConfig" title="新建菜单："></form-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { menuContentConfig } from './config/content.config'
import { dialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page/src/content-page.vue'
import FormDialog from '@/components/form-dialog/src/form-dialog.vue'

export default defineComponent({
  components: {
    ContentPage,
    FormDialog
  },
  setup() {
    const showDialog = ref(false)

    const handleCreate = () => {
      showDialog.value = true
    }

    return {
      menuContentConfig,
      showDialog,
      dialogConfig,
      handleCreate
    }
  }
})
</script>

<style scoped lang="less"></style>
