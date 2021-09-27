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
      <template #preview="{ row }">
        <el-button type="primary" plain @click="handlePreview(row.content)">预览</el-button>
      </template>
    </content-page>

    <form-dialog
      :pageName="pageName"
      :dialogConfig="writeDialogConfig"
      :dialogFormData="dialogFormData"
      v-model="isShowDialog"
      ref="formDialogRef"
    ></form-dialog>

    <el-dialog v-model="isShowPreview" title="预览文章：" destroy-on-close>
      <div class="preview-content">
        <mh-vditor-preview :markdownText="markdown" :outlineWidth="300"></mh-vditor-preview>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { BASE_URL } from '@/service/request/config'
import { options } from './config/vditor.page.config'
import { writeSearchConfig } from './config/search.config'
import { writeContentConfig } from './config/content.config'
import { writeDialogConfig } from './config/dialog.config'

import SearchPage from '@/components/search-page/src/search-page.vue'
import ContentPage from '@/components/content-page/src/content-page.vue'
import FormDialog from '@/components/form-dialog/src/form-dialog.vue'
import MhVditorPreview from '@/base-ui/mh-vditor/src/mh-vditor-preview.vue'

import { usePageDialog } from '@/hooks/use-page-dialog'

export default defineComponent({
  components: {
    SearchPage,
    ContentPage,
    FormDialog,
    MhVditorPreview
  },
  setup() {
    const pageName = 'write'
    const uploadIconPath = BASE_URL + '/files/cover'
    const isShowPreview = ref(false)
    const markdown = ref('')

    const handlePreview = (content: string) => {
      if (content === 'null' || !content) {
        markdown.value = '暂无内容'
      } else {
        markdown.value = content
      }
      isShowPreview.value = true
    }

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
      pageName,
      isShowPreview,
      markdown,
      handlePreview
    }
  }
})
</script>

<style scoped lang="less">
.essay-cover {
  height: 100px;
  border-radius: 5px;
}
.preview-content {
  border-radius: 5px;
  height: 500px;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 999;
}
</style>
