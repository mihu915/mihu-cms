import { ITableConfig } from '@/base-ui/mh-table'

const tableConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  treeProps: {
    rowKey: 'id',
    children: 'children'
  },

  propList: [
    { prop: 'title', label: '菜单名' },
    { prop: 'icon', label: '图标' },
    { prop: 'sort', label: '排序' },
    { prop: 'type', label: '类型' },
    { prop: 'url', label: 'url' },
    {
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}

export { tableConfig }
