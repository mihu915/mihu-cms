<template>
  <div class="system-menu">
    <div class="system-menu-header">
      <h2 class="table-title">菜单列表：</h2>
      <el-button type="primary" @click="handleCreateMenu">添加菜单</el-button>
    </div>

    <div class="menu-content">
      <mh-table :tableConfig="tableConfig" @deleteMenu="deleteMenu" @editMenu="editMenu"></mh-table>
    </div>

    <menu-form :formShow="formShow" @closeForm="closeForm"></menu-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MhTable from '@/base-ui/mh-table'

import { tableConfig } from './config/table.config'
import MenuForm from './cpns/menu-form.vue'

export default defineComponent({
  components: {
    MhTable,
    MenuForm
  },
  setup() {
    const formShow = ref(false)
    // 添加菜单
    const handleCreateMenu = () => {
      formShow.value = true
    }

    const editMenu = (row: any) => {
      console.log('编辑菜单', row.id)
    }

    const deleteMenu = (row: any) => {
      console.log('删除菜单', row.id)
    }
    const closeForm = () => {
      formShow.value = false
    }
    return {
      tableConfig,
      formShow,
      handleCreateMenu,
      deleteMenu,
      editMenu,
      closeForm
    }
  }
})
</script>

<style scoped lang="less">
.system-menu {
  padding: 20px;
}

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
