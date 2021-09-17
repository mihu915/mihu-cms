import { IFormConfig } from '@/base-ui/mh-form'

const writeSearchConfig: IFormConfig = {
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
      label: '文章标题：',
      field: 'title'
    },
    {
      type: 'input',
      label: '文章描述：',
      field: 'description'
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

export { writeSearchConfig }
