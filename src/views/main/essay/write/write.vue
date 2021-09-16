<template>
  <div class="write">
    <search-page
      title="文章查询："
      class="common-Piece"
      :searchConfig="essaySearchConfig"
      pageName="essay"
    ></search-page>

    <content-page
      class="common-Piece"
      title="文章列表："
      :contentConfig="essayContentConfig"
      pageName="essay"
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    ></content-page>

    <form-dialog
      pageName="essay"
      :dialogConfig="essayDialogConfig"
      :dialogFormData="dialogFormData"
      v-model="isShowDialog"
      ref="formDialogRef"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MhVditor from '@/base-ui/mh-vditor'

import { options } from './config/vditor.page.config'
import { essaySearchConfig } from './config/search.config'
import { essayContentConfig } from './config/content.config'
import { essayDialogConfig } from './config/dialog.config'

import SearchPage from '@/components/search-page/src/search-page.vue'
import ContentPage from '@/components/content-page/src/content-page.vue'
import FormDialog from '@/components/form-dialog/src/form-dialog.vue'

import { usePageDialog } from '@/hooks/use-page-dialog'

export default defineComponent({
  components: {
    SearchPage,
    ContentPage,
    FormDialog
  },
  setup() {
    // const handlePublish = () => {
    //   const value = vditorRef.value?.vditor?.getValue()
    //   console.log(value)
    // }
    // const vditorRef = ref<InstanceType<typeof MhVditor>>()
    const [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData] = usePageDialog()
    return {
      options,
      essaySearchConfig,
      essayContentConfig,
      essayDialogConfig,
      handleCreate,
      handleEdit,
      isShowDialog,
      formDialogRef,
      dialogFormData
    }
  }
})
</script>

<style scoped></style>
