import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './types'
import { login } from './login/login'
import { system } from './main/system/system'

const store = createStore<IRootStore>({
  state() {
    return {
      name: 'nonke',
      age: '123'
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
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
