import { ref } from 'vue'

import FormDialog from '@/components/form-dialog'

type callBackFn = (item?: any) => void

const usePageDialog = (createBc?: callBackFn, editBc?: callBackFn) => {
  const formDialogRef = ref<InstanceType<typeof FormDialog>>()
  const isShowDialog = ref(false)

  const textConfig: any = {}

  // 定义dialogFormData
  const dialogFormData = ref({})

  // 处理新建按钮逻辑
  const handleCreate = (pageName: string) => {
    isShowDialog.value = true
    textConfig.dialogRightBtnText = '新建'

    switch (pageName) {
      case 'user':
        textConfig.dialogTitle = '新建用户：'
        break
      case 'menu':
        textConfig.dialogTitle = '新建菜单：'
        break
      case 'role':
        textConfig.dialogTitle = '新建权限：'
        break
    }
    dialogFormData.value = {}
    formDialogRef.value?.setDialogTextInfo(textConfig)
    createBc && createBc()
  }

  // 处理编辑按钮逻辑
  const handleEdit = (row: any, pageName: string) => {
    textConfig.dialogRightBtnText = '保存'
    switch (pageName) {
      case 'user':
        textConfig.dialogTitle = '编辑用户：'
        break
      case 'menu':
        textConfig.dialogTitle = '编辑菜单：'
        break
      case 'role':
        textConfig.dialogTitle = '编辑权限：'
        break
    }
    isShowDialog.value = true
    dialogFormData.value = { ...row }
    formDialogRef.value?.setDialogTextInfo(textConfig)

    editBc && editBc(row)
  }

  return [handleCreate, handleEdit, isShowDialog, formDialogRef, dialogFormData]
}
export { usePageDialog }
