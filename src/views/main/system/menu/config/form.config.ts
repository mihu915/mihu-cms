import { IFormConfig } from '@/base-ui/mh-form'
const editMenuConfig: IFormConfig = {
  gutter: 100, //间距
  labelWidth: 100,
  itemLayout: {
    marginTop: '20px'
  },
  formItemConfig: [
    { type: 'input', label: '用户名', field: 'username', placeholder: '请输入用户名' },
    { type: 'password', label: '密码', field: 'password', placeholder: '请输入密码' },
    {
      type: 'select',
      label: '选择',
      field: 'selectResult',
      placeholder: '请选择',
      option: [
        { label: 'aaa', value: 'a' },
        { label: 'bbb', value: 'b' }
      ]
    },
    {
      type: 'datePicker',
      label: '选择时间',
      field: 'time',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}

export { editMenuConfig }
