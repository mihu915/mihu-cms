import type { ILoginStore } from './login/types'
import { IRoleStore } from './main/system/types'

export interface IRootStore {
  name: string
}

export interface IRootWithModule {
  role: IRoleStore
  menu: any
  login: ILoginStore
}

export type IStoreType = IRootStore & IRootWithModule
