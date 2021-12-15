<template>
  <div class="user">
    <search-page
      class="common-piece"
      :searchConfig="userSearchConfig"
      title="查询用户："
      pageName="user"
    >
    </search-page>
    <content-page
      class="common-piece"
      :contentConfig="userContentConfig"
      pageName="user"
      title="用户列表："
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    >
      <template #userAvatar="{ row }">
        <el-avatar
          v-if="row.avatar"
          shape="square"
          :size="70"
          fit="fill"
          :src="row.avatar"
        ></el-avatar>
      </template>
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
import { computed, defineComponent, ref } from 'vue'
import { userContentConfig } from './config/content.config'
import { userSearchConfig } from './config/search.config'
import { userDialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page'
import SearchPage from '@/components/search-page'
import FormDialog from '@/components/form-dialog'

import { usePageDialog } from '@/hooks/use-page-dialog'
import { alterFormConfig, handleSelectOptions } from '@/utils'
import { BASE_URL } from '@/service/request/config'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    ContentPage,
    SearchPage,
    FormDialog
  },

  setup() {
    const store = useStore()
    const uploadIconPath = ref(BASE_URL + '/files/avatar')

    const userDialogConfigRef = computed(() => {
      const roleOptions = handleSelectOptions(store.state.entireRoleData, 'role')
      alterFormConfig(userDialogConfig, 'role_id', 'options', roleOptions)
      return userDialogConfig
    })

    userDialogConfig.formItemConfig.find((item: any) => {
      if (item.field === 'avatar') {
        item.avatarOption!.action = uploadIconPath.value
      }
    })

    // 创建按钮回调
    const handleCreateConfig = () => {
      alterFormConfig(userDialogConfig, 'password', 'isShow', true)
    }

    // 编辑按钮回调
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

<style scoped>
.el-avatar {
  display: flex;
  position: relative;
  transform: translateX(-50%);
  left: 50%;
}
</style>
