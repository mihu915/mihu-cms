import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './types'
import { login } from './login/login'
import { common } from './main/common/common'
const store = createStore<IRootStore>({
  state() {
    return {
      name: 'nonke',
      allRoleList: []
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    common
  }
})

// 定义派发action方法
function setupStore() {
  store.dispatch('login/storageUserData')
}

// 自己封装的useStore,兼容ts
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export { store, setupStore }
