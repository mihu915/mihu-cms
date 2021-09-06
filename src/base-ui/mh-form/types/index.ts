interface IFormItemConfig {
  label: string
  field: string
  isShow?: boolean
  rules?: any
  type: 'input' | 'select' | 'password' | 'datePicker' | 'radioGroup'
  placeholder?: string

  options?: {
    label: string
    value?: any
  }[]

  otherOption?: {
    startPlaceholder?: string
    endPlaceholder?: string
    type?: 'daterange'
    border?: boolean
    size?: 'medium' | 'small' | 'mini'
    radioStyle?: any
  }
}

interface IFormConfig {
  gutter?: number // 间距
  labelWidth?: number
  formItemConfig: IFormItemConfig[]
  itemLayout?: any

  colLayout?: {
    span?: number
    xl?: number //≥1920px
    lg?: number //≥1200px
    md?: number //≥992px
    sm?: number //≥768px
    xs?: number //<768px
  }
}

export { IFormConfig, IFormItemConfig }
