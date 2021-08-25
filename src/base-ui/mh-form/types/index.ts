interface IFormItemConfig {
  label: string
  itemType: 'input' | 'select'
  placeholder?: string

  selectOptionItem?: {
    value: string
    label: string
  }[]
}

interface IFormConfig {
  itemAttributes: IFormItemConfig[]
}

export { IFormConfig }
