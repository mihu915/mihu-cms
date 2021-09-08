import { ITableConfig } from '@/base-ui/mh-table'

const userContentConfig: ITableConfig = {
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
    { prop: 'enable', label: '状态', slotName: 'statusBtn' },
    { prop: 'role_name', label: '权限' },
    { prop: 'realname', label: '真实姓名' },
    { prop: 'last_login_ip', label: '最近登录ip' },
    { prop: 'last_login_time', label: '最近登录时间' },
    { prop: 'operator_ip', label: '最近操作ip' },
    { prop: 'operator_time', label: '最近操作时间' },
    { prop: 'qq', label: 'qq' },
    { prop: 'mobile', label: '电话号码' },
    { prop: 'created', label: '创建时间' },

    {
      width: 150,
      label: '操作',
      slotName: 'actionBtn'
    }
  ]
}

export { userContentConfig }
