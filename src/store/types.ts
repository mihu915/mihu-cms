import type { ILoginStore } from './login/types'
import { ICommonStore } from './main/common/types'

export interface IRootStore {
  name: string
  allRoleList: any[]
}

export interface IRootWithModule {
  common: ICommonStore
  menu: any
  login: ILoginStore
}

export type IStoreType = IRootStore & IRootWithModule
