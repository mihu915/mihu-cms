import { ITableConfig } from '@/base-ui/mh-table/types/index'

const styleContentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  size: 'mini',

  showOtherTableContent: {
    showSelectColumn: true
  },

  propList: [
    { prop: 'blogger_name', label: '博客主名称' },
    { prop: 'blogger_avatar', label: '博客主头像', slotName: 'avatar' },
    { prop: 'blog_title', label: '博客标题' },
    { prop: 'signature', label: '个性签名' },
    { prop: 'updated', label: '更新时间', slotName: 'updated' },
    { prop: 'created', label: '创建时间', slotName: 'created' },
    {
      minWidth: 150,
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}
export { styleContentConfig }
