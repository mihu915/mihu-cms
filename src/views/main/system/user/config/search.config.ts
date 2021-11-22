import { IFormConfig } from '@/base-ui/mh-form'

const userSearchConfig: IFormConfig = {
  labelWidth: 100,
  gutter: 80,
  itemLayout: {
    marginBottom: '25px'
  },
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 24
  },
  formItemConfig: [
    {
      type: 'input',
      label: '用户名：',
      field: 'username',
      placeholder: '请输入用户名'
    },
    {
      type: 'select',
      label: '状态：',
      field: 'enable',
      options: [
        { label: '开启', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      type: 'input',
      label: '昵称：',
      field: 'nickname'
    },
    {
      type: 'datePicker',
      field: 'created',
      otherOption: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      },
      label: '创建时间：'
    }
  ]
}

export { userSearchConfig }
