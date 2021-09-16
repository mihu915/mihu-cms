import { ITableConfig } from '@/base-ui/mh-table/types/index'

const essayContentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  size: 'mini',

  showOtherTableContent: {
    showIndexColumn: true,
    showSelectColumn: true
  },
  propList: [
    { prop: 'title', label: '标题' },
    { prop: 'cover', label: '封面' },
    { prop: 'description', label: '描述' },
    { prop: 'created', label: '创建时间', slotName: 'created' },
    {
      minWidth: 150,
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}
export { essayContentConfig }
