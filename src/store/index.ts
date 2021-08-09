import { createStore } from 'vuex'
import { IRootStore } from './types'
import { loginModule } from './login/login'

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
    loginModule
  }
})

export { store }
