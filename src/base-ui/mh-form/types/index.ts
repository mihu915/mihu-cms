interface IFormItemConfig {
  label: string
  field: string
  type: 'input' | 'select' | 'password' | 'datePicker'
  placeholder?: string

  option?: {
    label: string
    value: string
  }[]

  otherOptions?: {
    startPlaceholder?: string
    endPlaceholder?: string
    type?: 'daterange'
  }

  colLayout?: {
    span?: number
    xl?: number //≥1920px
    lg?: number //≥1200px
    md?: number //≥992px
    sm?: number //≥768px
    xs?: number //<768px
  }
}

interface IFormConfig {
  gutter?: number // 间距
  labelWidth?: number
  formItemConfig: IFormItemConfig[]
  itemLayout?: any
}

export { IFormConfig, IFormItemConfig }
