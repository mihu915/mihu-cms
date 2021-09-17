interface ICommonStore {
  roleListData: IListData
  menuListData: IListData
  userListData: IListData
  writeListData: IListData
  username: any
}

interface IListData {
  list: any[]
  total_count: number
}
export { ICommonStore }
