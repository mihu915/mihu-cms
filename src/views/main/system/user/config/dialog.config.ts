import { IFormConfig } from '@/base-ui/mh-form'

const userDialogConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '25px'
  },
  formItemConfig: [
    {
      type: 'input',
      label: '用户名：',
      field: 'username',
      placeholder: '请输入菜单名',
      rules: [
        {
          required: true,
          message: '用户名不可为空',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'password',
      label: '密码：',
      field: 'password',
      placeholder: '请输入密码',
      rules: [
        {
          required: true,
          message: '密码不可为空',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'avatar',
      label: '头像：',
      field: 'avatar',
      avatarOption: {
        action: '',
        imageUrl: '',
        limit: 1,
        name: 'avatar'
      }
    },
    {
      type: 'select',
      label: '权限',
      field: 'role_id',
      rules: [
        {
          required: true,
          message: '权限为必选项',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      label: '昵称',
      field: 'nickname'
    },
    {
      type: 'input',
      label: 'QQ',
      field: 'qq'
    },
    {
      type: 'input',
      label: '电话号码',
      field: 'mobile'
    }
  ]
}

export { userDialogConfig }
