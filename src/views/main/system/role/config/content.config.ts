import { ITableConfig } from '@/base-ui/mh-table'

const contentConfig: ITableConfig = {
  rowKey: 'id',
  border: true,
  size: 'mini',
  treeProps: {
    rowKey: 'id',
    children: 'children'
  },
  showOtherTableContent: {
    showIndexColumn: true,
    showSelectColumn: true
  },
  propList: [
    { prop: 'username', label: '用户名' },
    { prop: 'enable', label: '状态' },
    { prop: 'register_ip', label: '注册ip' },
    { prop: 'register_time', label: '注册时间' },
    { prop: 'last_login_ip', label: '最近登录ip' },
    { prop: 'last_login_time', label: '最近登录时间' },

    {
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}

export { contentConfig }
