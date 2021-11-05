interface ICommonStore {
  roleListData: IListData
  menuListData: IListData
  userListData: IListData
  writeListData: IListData
  blogMenuListData: IListData
}

interface IListData {
  list: any[]
  total_count: number
}
export { ICommonStore }
