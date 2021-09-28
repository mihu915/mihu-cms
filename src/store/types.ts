import type { ILoginStore } from './login/types'
import { ICommonStore } from './main/common/types'
import { IEpidemicData } from './main/analysis/types'
import { IBlogStore } from './main/blog/types'

export interface IRootStore {
  name: string
  entireRoleData: any[]
  entireMenuData: any[]
}

export interface IRootWithModule {
  common: ICommonStore
  login: ILoginStore
  skill: IEpidemicData
  blog: IBlogStore
}

export type IStoreType = IRootStore & IRootWithModule
