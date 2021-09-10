import { IFormConfig } from '@/base-ui/mh-form'
const roleDialogConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '25px'
  },
  formItemConfig: [
    {
      type: 'tree',
      label: '选择菜单',
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

    // {
    //   type: 'select',
    //   label: '类型：',
    //   field: 'type',
    //   placeholder: '请选择类型',
    //   options: [
    //     { label: '父级菜单', value: 1 },
    //     { label: '子菜单', value: 2 }
    //   ],
    //   rules: [
    //     {
    //       required: true,
    //       message: '类型为必选的',
    //       trigger: 'blur'
    //     }
    //   ]
    // },
    // {
    //   type: 'radioGroup',
    //   label: '父级菜单：',
    //   field: 'parent_id',

    //   isShow: false,
    //   otherOption: {
    //     border: true,
    //     size: 'mini',
    //     radioStyle: {
    //       margin: '0 5px 0 0'
    //     }
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: '必须选择一个父级菜单',
    //       trigger: 'blur'
    //     }
    //   ]
    // }
  ]
}
export { roleDialogConfig }
