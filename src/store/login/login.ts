import { Module } from 'vuex'
import { router } from '@/router'

import { localCache, mapMenus } from '@/utils'

import { IRootStore } from '../types'
import { ILoginStore } from './types'
import { accountLoginRequest, getUserInfoRequest, getUserMenu } from '@/service/login/login'

const login: Module<ILoginStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
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
      state.userMenus = userMenu
    }
  },
  actions: {
    // 登录动作
    async userLoginAction({ commit, dispatch }, payload) {
      const loginResult = await accountLoginRequest(payload)
      if (loginResult.code !== 200) return
      const { token } = loginResult.data!
      commit('storageToken', token)
      localCache.setCache('token', token)

      // 进行初始化
      dispatch('userDataInit')

      // 跳转至首页
      router.replace('/main')
    },

    // 初始化动作
    async userDataInit({ commit }) {
      // 请求用户信息接口
      const userInfoResult = await getUserInfoRequest()
      if (userInfoResult.code !== 200) return
      const userInfo = userInfoResult.data
      localCache.setCache('userInfo', userInfo)
      commit('storageUserInfo', userInfo)

      //请求菜单接口
      const userMenuResult = await getUserMenu()
      if (userMenuResult.code !== 200) return
      const userMenus = userMenuResult.data
      localCache.setCache('userMenus', userMenus)
      commit('storageUserMenu', userMenus)

      // 动态加载路由
      mapMenus(userMenus)
    },

    // 刷新缓存存入vuex
    storageUserData({ commit, dispatch }) {
      const token = localCache.getCache('token')

      if (token) {
        commit('storageToken', token)
        dispatch('userDataInit')
      }
    }
  },
  modules: {}
}

export { login }
