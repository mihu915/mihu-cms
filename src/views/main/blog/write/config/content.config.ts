import { ITableConfig } from '@/base-ui/mh-table/types/index'

const writeContentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  size: 'mini',
  stripe: true,
  showOtherTableContent: {
    showSelectColumn: false
  },

  propList: [
    { prop: 'title', label: '标题' },
    { prop: 'cover', label: '封面', slotName: 'cover' },
    { prop: 'description', label: '描述' },
    { prop: 'write_tag', label: '标签', slotName: 'write_tag' },
    { prop: 'reading_count', label: '阅读人数', width: 80 },
    { prop: 'updated', label: '更新时间', slotName: 'updated', minWidth: 90 },
    { prop: 'created', label: '创建时间', slotName: 'created', minWidth: 90 },
    { prop: 'status', label: '状态', slotName: 'status' },

    {
      minWidth: 150,
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}
export { writeContentConfig }
