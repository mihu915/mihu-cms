import { IFormConfig } from '@/base-ui/mh-form'

const menuDialogConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '25px'
  },
  formItemConfig: [
    {
      type: 'input',
      label: '菜单名：',
      field: 'menu_name',
      placeholder: '请输入菜单名',
      rules: [
        {
          required: true,
          message: '菜单名不可为空',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      label: '图标：',
      field: 'menu_icon',
      placeholder: '请输入图标'
    },
    {
      type: 'input',
      label: '排序：',
      field: 'sort',
      placeholder: '请输入序号'
    },

    {
      type: 'input',
      label: 'url：',
      field: 'url',
      placeholder: '请输入url'
    }
  ]
}

export { menuDialogConfig }
