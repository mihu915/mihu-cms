import { Module } from 'vuex'

import { IRootStore } from '@/store/types'
import { ISystemStore } from './types'
import {
  createData,
  deleteListData,
  getListData,
  alterListData,
  userEnable
} from '@/service/system/system'

const system: Module<ISystemStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      roleListData: [],
      menuListData: [],
      userListData: [],
      username: 'mihu'
    }
  },
  getters: {
    getPageListData(state) {
      return (pageName: any) => {
        return (state as any)[`${pageName}ListData`]
      }
    }
  },

  mutations: {
    storeRoleListData(state, data) {
      state.roleListData = data
    },
    storeMenuListData(state, data) {
      state.menuListData = data
    },
    storeUserListData(state, data) {
      state.userListData = data
    }
  },

  actions: {
    // 获取列表数据
    async pageListDataAction({ commit }, payload) {
      const { pageName, queryInfo } = payload
      const result = await getListData(`/${pageName}/list`, queryInfo)

      if (result.code !== 200) return

      switch (pageName) {
        case 'role':
          commit('storeRoleListData', result.data)
          break
        case 'menu':
          commit('storeMenuListData', result.data)
          break
        case 'user':
          commit('storeUserListData', result.data)
          break
      }

      return new Promise((resolve) => {
        resolve(result.code)
      })
    },

    // 删除单条数据
    async deleteListData({ dispatch }, payload) {
      const { id, pageName } = payload

      const result = await deleteListData(`/${pageName}/${id}`)

      if (result.code !== 200) return

      await dispatch('pageListDataAction', { pageName: pageName })

      switch (pageName) {
        case 'menu':
          await dispatch('login/getUserMenus', null, { root: true })
          break
      }
    },

    // 新建数据
    async createData({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await createData(`/${pageName}`, data)
      if (result.code !== 200) return

      await dispatch('pageListDataAction', { pageName: pageName })

      switch (pageName) {
        case 'menu':
          // 更新用户菜单数据
          await dispatch('login/getUserMenus', null, { root: true })
          break
      }

      return new Promise((resolve) => {
        resolve(result.code)
      })
    },

    // 修改数据
    async alterListData({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await alterListData(`/${pageName}/${data.id}`, data)
      if (result.code !== 200) return

      await dispatch('pageListDataAction', { pageName: pageName })

      switch (pageName) {
        case 'menu':
          await dispatch('login/getUserMenus', null, { root: true })
          break
      }

      return new Promise((resolve) => {
        resolve(result.code)
      })
    },

    // 切换用户状态
    async switchUserEnable(context, payload) {
      const { id, role_id } = payload

      const enable = payload.enable ? 0 : 1

      const result = await userEnable(id, enable, role_id)

      return new Promise((resolve, reject) => {
        if (result.code !== 200) reject(result)
        resolve(enable)
      })
    }
  }
}

export { system }
