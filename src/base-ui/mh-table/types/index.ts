interface IPropList {
  prop?: string
  label: string
  minWidth?: number
  width?: number
  align?: 'left' | 'center' | 'right'
  resizable?: boolean
  slotName?: string
  showOverflowTooltip?: boolean
  isShowQuestionFilled?: boolean
  questionFilledText?: string
}

export interface ITableConfig {
  border?: boolean
  rowKey: string
  size?: 'medium' | 'small' | 'mini'
  showFooter?: boolean
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
