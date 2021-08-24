import { ITableConfig } from '@/base-ui/mh-table'
import { store } from '@/store'

const tableConfig: ITableConfig = {
  showOtherTableContent: {
    showIndexColumn: false,
    showSelectColumn: false
  },

  tableAttributes: {
    rowKey: 'id',
    border: true,
    treeProps: {
      rowKey: 'id',
      children: 'children'
    },
    data: (store.state as any).login.userMenus
  },

  propList: [
    { prop: 'title', label: '标题' },
    { prop: 'icon', label: '图标' },
    { prop: 'sort', label: '排序' },
    { prop: 'type', label: '类型' },
    { prop: 'url', label: 'url' },
    {
      label: '操作',
      isSlot: true,
      operation: [
        { textContent: '编辑', icon: 'el-icon-edit', emitEventName: 'editMenu' },
        { textContent: '删除', icon: 'el-icon-delete', emitEventName: 'deleteMenu' }
      ]
    }
  ]
}

export { tableConfig }
