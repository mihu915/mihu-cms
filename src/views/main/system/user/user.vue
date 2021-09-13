<template>
  <div class="user">
    <search-page
      class="common-Piece"
      :searchConfig="userSearchConfig"
      title="查询用户："
      pageName="user"
    >
    </search-page>
    <content-page
      class="common-Piece"
      :contentConfig="userContentConfig"
      pageName="user"
      title="用户列表："
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    >
    </content-page>
    <form-dialog
      :dialogConfig="userDialogConfigRef"
      ref="formDialogRef"
      v-model="isShowDialog"
      pageName="user"
      :dialogFormData="dialogFormData"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { userContentConfig } from './config/content.config'
import { userSearchConfig } from './config/search.config'
import { userDialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page'
import SearchPage from '@/components/search-page'
import FormDialog from '@/components/form-dialog'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { alterFormConfig, handleRoleOptions } from '@/utils'

import { useStore } from '@/store'
export default defineComponent({
  components: {
    ContentPage,
    SearchPage,
    FormDialog
  },

  setup() {
    const store = useStore()

    const userDialogConfigRef = computed(() => {
      const roleOptions = handleRoleOptions(store.state.entireRoleData)
      alterFormConfig(userDialogConfig, 'role_id', 'options', roleOptions)
      return userDialogConfig
    })

    const handleCreateConfig = () => {
      alterFormConfig(userDialogConfig, 'password', 'isShow', true)
    }

    const handleEditConfig = () => {
      alterFormConfig(userDialogConfig, 'password', 'isShow', false)
    }

    const [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData] = usePageDialog(
      handleCreateConfig,
      handleEditConfig
    )

    return {
      userContentConfig,
      userSearchConfig,
      userDialogConfigRef,
      dialogFormData,
      isShowDialog,
      formDialogRef,
      handleCreate,
      handleEdit
    }
  }
})
</script>

<style scoped></style>
