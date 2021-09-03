import { Module } from 'vuex'

import { IRootStore } from '@/store/types'
import { ISystemStore } from './types'
import { createMenu, deleteMenu, getListData, alterMenu } from '@/service/system/system'

const system: Module<ISystemStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      roleListData: [],
      username: 'mihu'
    }
  },
  getters: {
    getPageListData(state) {
      return (pageName: any) => {
        console.log((state as any)[`${pageName}ListData`])
        return (state as any)[`${pageName}ListData`]
      }
    }
  },
  mutations: {
    storeRoleListData(state, data) {
      state.roleListData = data
    }
  },

  actions: {
    // 获取列表数据
    async pageListDataAction({ commit }, payload) {
      const result = await getListData(payload.url, payload.queryInfo)
      console.log(result)
      if (result.code !== 200) return
      commit('storeRoleListData', result.data)
    },

    async createMenu({ dispatch }, menuData) {
      const result = await createMenu(menuData)
      if (result.code !== 200) return
      // 更新用户菜单数据
      await dispatch('login/getUserMenus', null, { root: true })
    },

    async deleteMenu({ dispatch }, menuId) {
      const result = await deleteMenu(menuId)
      if (result.code !== 200) return
      await dispatch('login/getUserMenus', null, { root: true })
    },

    async alterMenu({ dispatch }, menuData) {
      const result = await alterMenu(menuData)
      if (result.code !== 200) return
      await dispatch('login/getUserMenus', null, { root: true })
    }
  }
}

export { system }
