import { Module } from 'vuex'
import { router } from '@/router'

import { localCache } from '@/utils'

import { IRootStore } from '../types'
import { ILoginStore } from './types'
import { accountLoginRequest, getUserInfoRequest, getUserMenu } from '@/service/login/login'

const login: Module<ILoginStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
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
    },

    // 存储菜单
    storageUserMenu(state, userMenu) {
      state.userMenu = userMenu
    }
  },
  actions: {
    async userLoginAction({ commit }, payload) {
      // 请求登录接口
      const loginResult = await accountLoginRequest(payload)
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
      const userMenuResult = await getUserMenu()
      if (userMenuResult.code !== 200) return
      const userMenu = userMenuResult.data
      localCache.setCache('userMenu', userMenu)
      commit('storageUserMenu', userMenu)

      // 跳转至首页
      router.replace('/main')
    },

    // 刷新缓存存入vuex
    storageUserData({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('storageToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('storageUserInfo', userInfo)
      }

      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('storageUserMenu', userMenu)
      }
    }
  },
  modules: {}
}

export { login }
