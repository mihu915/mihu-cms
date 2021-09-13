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
    storageUserMenu(state, userMenus) {
      // 将菜单数据保存
      state.userMenus = userMenus

      // 获取匹配到的路由
      const menuRoutes = mapMenus(userMenus)

      // 注册路由
      menuRoutes.forEach((route) => {
        router.addRoute('main', route)
      })
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

      await dispatch('updateUserInfo')
      await dispatch('getUserMenus')
      await dispatch('getInitialDataAction', null, { root: true })

      // 跳转至首页
      router.replace('/main')
    },

    // 更新用户信息
    async updateUserInfo({ commit }) {
      const userInfoResult = await getUserInfoRequest()

      return new Promise((resolve, reject) => {
        if (userInfoResult.code !== 200) return reject(userInfoResult)
        const userInfo = userInfoResult.data
        localCache.setCache('userInfo', userInfo)
        commit('storageUserInfo', userInfo)

        resolve(userInfoResult.code)
      })
    },

    //请求菜单接口
    async getUserMenus({ commit }) {
      const userMenuResult = await getUserMenu()
      if (userMenuResult.code !== 200) return userMenuResult.code
      const userMenus = userMenuResult.data
      localCache.setCache('userMenus', userMenus)
      commit('storageUserMenu', userMenus)
    },

    // 刷新后先将缓存中的数据存入到store,然后再更新一次数据
    async storageUserData({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) commit('storageToken', token)

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) commit('storageUserInfo', userInfo)

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) commit('storageUserMenu', userMenus)

      // 更新数据
      if (token) {
        await dispatch('updateUserInfo')
          .then(async () => {
            await dispatch('getUserMenus')
            await dispatch('getInitialDataAction', null, { root: true })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  modules: {}
}

export { login }
