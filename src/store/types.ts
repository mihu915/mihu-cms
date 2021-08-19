import type { ILoginStore } from './login/types'

export interface IRootStore {
  name: string
}

export interface IRootWithModule {
  login: ILoginStore
}

export type IStoreType = IRootStore & IRootWithModule
