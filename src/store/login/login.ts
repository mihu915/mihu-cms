import { Module } from 'vuex'
import { IRootStore } from '../types'
import { ILoginStore } from './types'
import { localCache } from '@/utils'

import { accountLoginRequest, getUserInfoRequest } from '@/service/login/login'

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
    // 存储token
    storageToken(state, token) {
      state.token = token
    },

    // 存储用户信息到vuex
    storageUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async userLoginAction({ commit }, payload) {
      // 请求登录接口
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      if (loginResult.code !== 200) return
      const { token } = loginResult.data!
      commit('storageToken', token)
      localCache.setCache('token', token)

      // 请求用户信息接口
      const userInfoResult = await getUserInfoRequest()
      if (userInfoResult.code !== 200) return
      const userInfo = userInfoResult.data
      localCache.setCache('userInfo', userInfo)
      commit('storageUserInfo', userInfo)

      //请求菜单接口
    }
  },
  modules: {}
}

export { loginModule }
