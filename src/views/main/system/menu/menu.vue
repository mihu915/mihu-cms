<template>
  <div class="system-menu">
    <content-page
      :contentConfig="menuContentConfig"
      title="菜单管理："
      pageName="menu"
      @handleEdit="handleEdit"
      @handleCreate="handleCreate"
    ></content-page>

    <form-dialog
      :type="type"
      v-model="showDialog"
      pageName="menu"
      :dialogConfig="dialogConfig"
      :title="dialogTitle"
      :editData="editData"
    ></form-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { menuContentConfig } from './config/content.config'
import { dialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page/src/content-page.vue'
import FormDialog from '@/components/form-dialog/src/form-dialog.vue'

export default defineComponent({
  components: {
    ContentPage,
    FormDialog
  },

  setup() {
    const showDialog = ref(false)
    const type = ref('')
    const dialogTitle = ref('')
    const editData = ref({})

    // 处理创建按钮
    const handleCreate = () => {
      showDialog.value = true
      type.value = 'new'
      dialogTitle.value = '新建菜单'
    }

    // 处理编辑按钮
    const handleEdit = (row: any) => {
      showDialog.value = true
      type.value = 'edit'
      dialogTitle.value = '编辑菜单'
      console.log(row)
      editData.value = row
    }

    return {
      menuContentConfig,
      showDialog,
      dialogConfig,
      dialogTitle,
      type,
      editData,
      handleCreate,
      handleEdit
    }
  }
})
</script>

<style scoped lang="less"></style>
