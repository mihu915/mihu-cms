interface IPropList {
  prop?: string
  label: string
  minWidth?: number
  width?: number
  align?: 'left' | 'center' | 'right'
  resizable?: boolean
  slotName?: string
  showOverflowTooltip?: boolean
}

export interface ITableConfig {
  border?: boolean
  rowKey: string
  size?: 'medium' | 'small' | 'mini'
  treeProps?: {
    children?: string
    rowKey: string
  }

  showOtherTableContent?: {
    showSelectColumn?: boolean
    showIndexColumn?: boolean
  }
  propList: IPropList[]
}
