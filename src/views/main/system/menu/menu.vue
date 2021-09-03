<template>
  <div class="system-menu">
    <div class="system-menu-header">
      <h2 class="table-title">菜单列表：</h2>
      <el-button type="primary" @click="handleCreateMenu">添加菜单</el-button>
    </div>

    <div class="menu-content">
      <mh-table :tableConfig="tableConfig" :tableData="userMenus">
        <template v-slot:actionBtn="scope">
          <div class="action-btn">
            <el-button type="text" @click="handleEditMenu(scope.row)">
              <i class="el-icon-edit"></i>
              编辑
            </el-button>

            <el-button type="text" @click="handleDeleteMenu(scope.row)">
              <i class="el-icon-delete"></i>
              删除
            </el-button>
          </div>
        </template>
      </mh-table>
    </div>

    <menu-form
      :formShow="formShow"
      @closeForm="handleCloseForm"
      :openFormType="openFormType"
      :currentMenuData="currentMenuData"
    ></menu-form>
  </div>
</template>

<script lang="ts">
import MhTable from '@/base-ui/mh-table'
import MenuForm from './cpns/menu-form.vue'

import { computed, defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { tableConfig } from './config/table.config'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    MhTable,
    MenuForm
  },
  setup() {
    const formShow = ref(false)
    const store = useStore()
    const openFormType = ref('')
    const currentMenuData = ref({})
    const userMenus = computed(() => store.state.login.userMenus)

    const openBox = (menuName: string) => {
      return ElMessageBox.confirm(`此操作将删除菜单:《${menuName}》，是否继续？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }

    // 打开菜单form
    const handleCreateMenu = () => {
      formShow.value = true
      openFormType.value = 'new'
    }

    const handleEditMenu = (menuData: any) => {
      formShow.value = true
      openFormType.value = 'edit'
      currentMenuData.value = menuData
    }

    // 关闭菜单form
    const handleCloseForm = () => {
      formShow.value = false
    }

    // 删除菜单
    const handleDeleteMenu = (menu: any) => {
      openBox(menu.title)
        .then(() => {
          store.dispatch('system/deleteMenu', menu.id)
        })
        .catch(() => {
          return
        })
    }

    return {
      tableConfig,
      formShow,
      userMenus,
      openFormType,
      currentMenuData,
      handleCreateMenu,
      handleDeleteMenu,
      handleEditMenu,
      handleCloseForm
    }
  }
})
</script>

<style scoped lang="less">
.menu-title {
  margin: 0;
}
.menu-content {
  margin: 0 auto;
}

.system-menu-header {
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: space-between;
  .table-title {
    margin: 0;
  }
  .el-button {
    height: 40px;
  }
}
</style>
