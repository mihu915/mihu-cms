import type { ILoginStore } from './login/types'
import { ISystemStore } from './main/system/types'

export interface IRootStore {
  name: string
  allRoleList: any[]
}

export interface IRootWithModule {
  system: ISystemStore
  menu: any
  login: ILoginStore
}

export type IStoreType = IRootStore & IRootWithModule
