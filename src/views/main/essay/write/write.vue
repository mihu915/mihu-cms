<template>
  <div class="write">
    <search-page
      title="文章查询："
      class="common-Piece"
      :searchConfig="writeSearchConfig"
      :pageName="pageName"
    ></search-page>

    <content-page
      class="common-Piece"
      title="文章列表："
      :contentConfig="writeContentConfig"
      :pageName="pageName"
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    >
      <template #cover="{ row }">
        <el-image
          v-if="row.cover && row.cover.length"
          :src="row.cover"
          fit="fill"
          lazy
          alt="文章封面"
          class="essay-cover"
        ></el-image>
      </template>
    </content-page>

    <form-dialog
      :pageName="pageName"
      :dialogConfig="writeDialogConfig"
      :dialogFormData="dialogFormData"
      v-model="isShowDialog"
      ref="formDialogRef"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { options } from './config/vditor.page.config'
import { writeSearchConfig } from './config/search.config'
import { writeContentConfig } from './config/content.config'
import { writeDialogConfig } from './config/dialog.config'
import { BASE_URL } from '@/service/request/config'
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
    const pageName = 'write'
    const uploadIconPath = BASE_URL + '/files/cover'
    writeDialogConfig.formItemConfig.find((item: any) => {
      if (item.field === 'cover') {
        item.avatarOption!.action = uploadIconPath
      }
    })

    const [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData] = usePageDialog()
    return {
      options,
      writeSearchConfig,
      writeContentConfig,
      writeDialogConfig,
      handleCreate,
      handleEdit,
      isShowDialog,
      formDialogRef,
      dialogFormData,
      pageName
    }
  }
})
</script>

<style scoped lang="less">
.essay-cover {
  height: 100px;
  border-radius: 5px;
}
</style>
