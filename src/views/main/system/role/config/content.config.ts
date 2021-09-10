import { ITableConfig } from '@/base-ui/mh-table/types/index'

const roleContentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  size: 'mini',

  showOtherTableContent: {
    showIndexColumn: true,
    showSelectColumn: true
  },
  propList: [
    { prop: 'role_name', label: '角色名' },
    { prop: 'role_intro', label: '权限描述' },
    { prop: 'created', label: '创建时间', slotName: 'created' },
    { prop: 'updated', label: '更新时间', slotName: 'updated' },

    {
      minWidth: 150,
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}
export { roleContentConfig }
