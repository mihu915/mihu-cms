import { Module } from 'vuex'

import { IRootStore } from '@/store/types'
import { ISystemStore } from './types'
import { createData, deleteListData, getListData, alterListData } from '@/service/system/system'

const system: Module<ISystemStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      roleListData: [],
      menuListData: [],
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
    }
  },

  actions: {
    // 获取列表数据
    async pageListDataAction({ commit }, payload) {
      const { pageName, queryInfo } = payload
      const result = await getListData(`/${pageName}/list`, queryInfo)
      console.log(result)
      if (result.code !== 200) return

      switch (pageName) {
        case 'role':
          commit('storeRoleListData', result.data)
          break
        case 'menu':
          commit('storeMenuListData', result.data)
          break
      }
    },

    // 删除单条数据
    async deleteListData({ dispatch }, payload) {
      const { id, pageName } = payload

      const result = await deleteListData(`/${pageName}/${id}`)

      if (result.code !== 200) return

      switch (pageName) {
        case 'menu':
          await dispatch('login/getUserMenus', null, { root: true })
          await dispatch('pageListDataAction', { pageName: pageName })
          break
      }
    },

    async createData({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await createData(`/${pageName}`, data)
      if (result.code !== 200) return

      switch (pageName) {
        case 'menu':
          // 更新用户菜单数据
          await dispatch('login/getUserMenus', null, { root: true })
          await dispatch('pageListDataAction', { pageName: pageName })
          break
      }
    },

    async alterListData({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await alterListData(`/${pageName}/${data.id}`, data)
      if (result.code !== 200) return

      switch (pageName) {
        case 'menu':
          await dispatch('login/getUserMenus', null, { root: true })
          await dispatch('pageListDataAction', { pageName: pageName })
          break
      }
    }
  }
}

export { system }
