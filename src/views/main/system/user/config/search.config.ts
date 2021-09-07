import { IFormConfig } from '@/base-ui/mh-form'

const roleSearchConfig: IFormConfig = {
  labelWidth: 100,
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
      label: '类型：',
      field: 'enable',
      placeholder: '状态',
      options: [
        { label: '开启', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      type: 'input',
      label: '真实姓名：',
      field: 'realname',
      placeholder: '请输入真实姓名'
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

export { roleSearchConfig }
