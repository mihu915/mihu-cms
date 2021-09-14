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
    { prop: 'avatar', label: '头像', slotName: 'userAvatar' },
    { prop: 'enable', label: '状态', slotName: 'statusBtn', width: 80 },
    { prop: 'role_name', label: '权限' },
    { prop: 'nickname', label: '昵称' },
    { prop: 'qq', label: 'qq' },
    { prop: 'last_login_ip', label: '最近登录ip' },
    { prop: 'last_login_time', label: '最近登录时间', slotName: 'lastLoginTime', width: 150 },
    { prop: 'operator_ip', label: '最近操作ip' },
    { prop: 'operator_time', label: '最近操作时间', slotName: 'operatorTime', width: 150 },
    { prop: 'created', label: '创建时间', slotName: 'created', width: 150 },
    { label: '操作', width: 150, slotName: 'actionBtn' }
  ]
}

export { userContentConfig }
