<template>
  <div class="system-menu">
    <content-page
      :contentConfig="menuContentConfig"
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
      title="菜单管理："
      pageName="menu"
    ></content-page>
    <form-dialog
      :dialogConfig="menuDialogConfig"
      :dialogFormData="dialogFormData"
      v-model="isShowDialog"
      ref="formDialogRef"
      pageName="menu"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { menuContentConfig } from './config/content.config'
import { menuDialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page/src/content-page.vue'
import FormDialog from '@/components/form-dialog/src/form-dialog.vue'

import { usePageDialog } from '@/hooks/use-page-dialog'

import { alterFormConfig, getParentMenuInfo } from '@/utils'

import { useStore } from '@/store'

export default defineComponent({
  components: {
    ContentPage,
    FormDialog
  },

  setup() {
    const store = useStore()

    const entireMenuDataRef = computed(() => {
      const entireMenuData = store.state.entireMenuData
      return entireMenuData
    })

    const handleCreateConfig = () => {
      const parentOption = getParentMenuInfo(entireMenuDataRef.value)
      alterFormConfig(menuDialogConfig, 'parent_id', 'options', parentOption)
    }

    const handleEditConfig = (row: any) => {
      const parentOption = getParentMenuInfo(entireMenuDataRef.value, row.id)
      alterFormConfig(menuDialogConfig, 'parent_id', 'options', parentOption)
    }

    const [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData] = usePageDialog(
      handleCreateConfig,
      handleEditConfig
    )

    return {
      isShowDialog,
      dialogFormData,
      formDialogRef,
      menuContentConfig,
      menuDialogConfig,
      handleCreate,
      handleEdit
    }
  }
})
</script>

<style scoped lang="less"></style>
