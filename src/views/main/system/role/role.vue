<template>
  <div class="role">
    <search-page :searchConfig="roleSearchConfig" title="查询角色：" pageName="role"></search-page>

    <content-page
      :contentConfig="roleContentConfig"
      pageName="role"
      title="角色信息："
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    >
      <template #roleMenu="scope">
        {{ getMenuTile(scope.row.role_menu) || '—' }}
      </template>
    </content-page>

    <form-dialog
      :dialogConfig="roleDialogConfigRef"
      :dialogFormData="dialogFormData"
      v-model="isShowDialog"
      ref="formDialogRef"
      pageName="role"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import contentPage from '@/components/content-page/src/content-page.vue'
import SearchPage from '@/components/search-page/src/search-page.vue'
import FormDialog from '@/components/form-dialog/src/form-dialog.vue'

import { computed, defineComponent } from 'vue'

import { roleSearchConfig } from './config/search.config'
import { roleContentConfig } from './config/content.config'
import { roleDialogConfig } from './config/dialog.config'

import { usePageDialog } from '@/hooks/use-page-dialog'

import { useStore } from '@/store'
import { getConfigItemIndex, stringToNumberArray, filterParentMenuId } from '@/utils'
export default defineComponent({
  components: { SearchPage, contentPage, FormDialog },
  setup() {
    // 获取角色对应匹配到的菜单标题并展示
    const getMenuTile = (menusId: string) => {
      return store.getters['getAssignMenuName'](menusId)
    }

    const store = useStore()
    // 获取所有菜单数据

    const treeIndex = getConfigItemIndex(roleDialogConfig.formItemConfig, 'field', 'role_menu')

    let entireMenuData: any

    const roleDialogConfigRef = computed(() => {
      // 将数据传入到el-tree的data中
      entireMenuData = computed(() => store.state.entireMenuData)
      roleDialogConfig.formItemConfig[treeIndex!].treeOption!.data = entireMenuData.value

      return roleDialogConfig
    })

    const handleCreateConfig = () => {
      roleDialogConfigRef.value.formItemConfig[treeIndex!].treeOption!.defaultCheckedKeys = []
      roleDialogConfigRef.value.formItemConfig[treeIndex!].treeOption!.defaultExpandedKeys = []
    }
    const handleEditConfig = (row: any) => {
      const menusId = filterParentMenuId(entireMenuData.value, stringToNumberArray(row.role_menu))
      roleDialogConfigRef.value.formItemConfig[treeIndex!].treeOption!.defaultCheckedKeys = menusId
      roleDialogConfigRef.value.formItemConfig[treeIndex!].treeOption!.defaultExpandedKeys = menusId
    }

    const [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData] = usePageDialog(
      handleCreateConfig,
      handleEditConfig
    )

    return {
      getMenuTile,
      roleSearchConfig,
      roleContentConfig,
      roleDialogConfigRef,
      isShowDialog,
      formDialogRef,
      dialogFormData,
      handleCreate,
      handleEdit
    }
  }
})
</script>

<style scoped></style>
