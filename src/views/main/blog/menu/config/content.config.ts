import type { ITableConfig } from '@/base-ui/mh-table'

const menuContentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  showFooter: false,
  size: 'small',

  propList: [
    { prop: 'sort', label: '排序' },
    { prop: 'menu_name', label: '菜单名' },
    { prop: 'menu_icon', label: '图标' },
    { prop: 'url', label: 'url' },
    { prop: 'enable', label: '状态' },
    { prop: 'created', label: '创建时间', slotName: 'created' },
    { prop: 'updated', label: '更新时间', slotName: 'updated' },
    {
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}

export { menuContentConfig }
