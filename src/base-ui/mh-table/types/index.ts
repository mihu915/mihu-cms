export interface IPropList {
  prop?: string
  label: string
  minWidth?: number
  width?: number
  align?: 'left' | 'center' | 'right'
  resizable?: boolean
  isSlot?: boolean
  operation?: IOperation[]
}

interface IOperation {
  textContent: string
  icon?: string
  emitEventName: string
}
export interface ITableAttributes {
  border?: boolean
  data: []
  rowKey: string
  treeProps?: {
    children?: string
    rowKey: string
  }
}

export interface ITableConfig {
  propList: IPropList[]
  tableAttributes: ITableAttributes
  showOtherTableContent: {
    showSelectColumn: boolean
    showIndexColumn: boolean
  }
}
