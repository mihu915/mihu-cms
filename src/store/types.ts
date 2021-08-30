import type { ILoginStore } from './login/types'

export interface IRootStore {
  name: string
}

export interface IRootWithModule {
  system: any
  login: ILoginStore
}

export type IStoreType = IRootStore & IRootWithModule
