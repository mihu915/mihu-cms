import type { ILoginStore } from './login/types'
import { ICommonStore } from './main/common/types'
import { IEpidemicData } from './main/analysis/types'

export interface IRootStore {
  name: string
  entireRoleData: any[]
  entireMenuData: any[]
}

export interface IRootWithModule {
  common: ICommonStore
  login: ILoginStore
  skill: IEpidemicData
}

export type IStoreType = IRootStore & IRootWithModule
