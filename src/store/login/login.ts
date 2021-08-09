import { Module } from 'vuex'
import { IRootStore } from '../types'
import { ILoginStore } from './types'

import { accountLoginRequest } from '@/service/login/login'
const loginModule: Module<ILoginStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async userLoginAction({ commit }, payload) {
      const result = await accountLoginRequest(payload)
      const { id, token } = result.data
      commit('changeToken', token)
    }
  },
  modules: {}
}

export { loginModule }
