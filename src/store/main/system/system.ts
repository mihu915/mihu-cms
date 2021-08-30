import { IRootStore } from '@/store/types'
import { Module } from 'vuex'
import { alterMenu, createMenu, deleteMenu } from '@/service/menu/menu'

const system: Module<any, IRootStore> = {
  namespaced: true,
  state() {
    return {
      username: 'mihu'
    }
  },
  getters: {},
  mutations: {},
  actions: {
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
