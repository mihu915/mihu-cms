<template>
  <div class="role">
    <search-page :searchConfig="roleSearchConfig" title="查询角色：" pageName="role"></search-page>
    <content-page
      :contentConfig="roleContentConfig"
      pageName="role"
      title="角色信息："
      :dialogConfig="roleDialogConfig"
      :dialogWidth="500"
    >
      <template #roleMenu="scope">
        {{ getMenuTile(scope.row.role_menu) || '—' }}
      </template>
    </content-page>
  </div>
</template>

<script lang="ts">
import contentPage from '@/components/content-page/src/content-page.vue'
import SearchPage from '@/components/search-page/src/search-page.vue'

import { computed, defineComponent } from 'vue'

import { roleSearchConfig } from './config/search.config'
import { roleContentConfig } from './config/content.config'
import { roleDialogConfig } from './config/dialog.config'

import { useStore } from '@/store'
import { getConfigItemIndex } from '@/utils'
export default defineComponent({
  components: { SearchPage, contentPage },
  setup() {
    const store = useStore()
    // 获取所有菜单数据
    const allMenuData = computed(() => [...store.state.login.userInfo.all_menu_list])

    // 将数据传入到el-tree的data中
    const treeIndex = getConfigItemIndex(roleDialogConfig.formItemConfig, 'field', 'role_menu')
    roleDialogConfig.formItemConfig[treeIndex!].treeOption!.data = allMenuData.value

    // 获取角色对应匹配到的菜单标题并展示
    const getMenuTile = (menusId: string) => {
      return store.getters['login/getAssignMenuName'](menusId)
    }

    return {
      getMenuTile,
      roleSearchConfig,
      roleContentConfig,
      roleDialogConfig
    }
  }
})
</script>

<style scoped></style>
