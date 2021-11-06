<template>
  <div>
    <content-page
      class="common-piece"
      :contentConfig="menuContentConfig"
      pageName="menu"
      prefix="blog"
      title="博客菜单："
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    ></content-page>

    <form-dialog
      :dialogConfig="menuDialogConfig"
      :dialogFormData="dialogFormData"
      v-model="isShowDialog"
      ref="formDialogRef"
      pageName="menu"
      prefix="blog"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import ContentPage from '@/components/content-page'
import FormDialog from '@/components/form-dialog'
import { defineComponent } from 'vue'
import { menuContentConfig } from './config/content.config'
import { menuDialogConfig } from './config/dialog.config'
import { usePageDialog } from '@/hooks/use-page-dialog'

export default defineComponent({
  components: {
    ContentPage,
    FormDialog
  },
  setup() {
    const [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData] = usePageDialog()
    return {
      menuContentConfig,
      menuDialogConfig,
      isShowDialog,
      handleCreate,
      handleEdit,
      formDialogRef,
      dialogFormData
    }
  }
})
</script>

<style scoped></style>
