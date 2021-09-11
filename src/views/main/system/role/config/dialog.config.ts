import { IFormConfig } from '@/base-ui/mh-form'
const roleDialogConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '20px'
  },
  formItemConfig: [
    { type: 'input', label: '角色名：', field: 'role_name' },
    { type: 'input', label: '权限描述：', field: 'role_intro' },
    {
      type: 'tree',
      label: '选择菜单：',
      field: 'role_menu',
      treeOption: {
        nodeKey: 'id',
        showCheckbox: true,
        props: {
          children: 'children',
          label: 'title'
        }
      }
    }
  ]
}
export { roleDialogConfig }
