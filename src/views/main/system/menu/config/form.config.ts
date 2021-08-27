import { IFormConfig } from '@/base-ui/mh-form'
import { store } from '@/store'
import { getParentMenu } from '@/utils'
const userMenus = (store.state as any).login.userMenus

const groupLabels: any[] = []

getParentMenu(userMenus).forEach((item) => {
  groupLabels.push({ label: item.id, value: item.title })
})

const editMenuConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '25px'
  },
  formItemConfig: [
    {
      type: 'input',
      label: '菜单名：',
      field: 'menuName',
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
      field: 'icon',
      placeholder: '请输入图标'
    },
    {
      type: 'input',
      label: '排序：',
      field: 'sort',
      placeholder: '请输入序号'
    },
    {
      type: 'select',
      label: '类型：',
      field: 'type',
      placeholder: '请选择类型',
      options: [
        { label: '折叠选项', value: 1 },
        { label: '菜单', value: 2 }
      ]
    },
    {
      type: 'radioGroup',
      label: '父级菜单：',
      field: 'parentMenu',
      isShow: false,
      options: groupLabels,
      otherOption: {
        border: true,
        size: 'mini',
        radioStyle: {
          margin: '0 5px 0 0'
        }
      },
      rules: [
        {
          required: true,
          message: '必须选择一个父级菜单',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      label: 'url：',
      field: 'url',
      placeholder: '请输入url'
    }
  ]
}

export { editMenuConfig }
