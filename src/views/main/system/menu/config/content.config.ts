import { ITableConfig } from '@/base-ui/mh-table'

const menuContentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  size: 'mini',
  treeProps: {
    rowKey: 'id',
    children: 'children'
  },

  propList: [
    { prop: 'title', label: '菜单名' },
    { prop: 'icon', label: '图标' },
    { prop: 'sort', label: '排序' },
    { prop: 'type', label: '类型', slotName: 'typeTag' },
    { prop: 'url', label: 'url' },
    { prop: 'created', label: '创建时间', slotName: 'created' },
    { prop: 'updated', label: '更新时间', slotName: 'updated' },
    {
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}

export { menuContentConfig }
