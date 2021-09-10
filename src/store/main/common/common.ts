import { Module } from 'vuex'

import { IRootStore } from '@/store/types'
import { ICommonStore } from './types'
import {
  createData,
  deleteListData,
  getListData,
  alterListData,
  userEnable
} from '@/service/system/system'

const common: Module<ICommonStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      roleListData: {
        list: [],
        total_count: 0
      },
      menuListData: {
        list: [],
        total_count: 0
      },
      userListData: {
        list: [],
        total_count: 0
      },
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

      return new Promise((resolve, reject) => {
        if (result.code !== 200) reject(result)

        // 将pageName转成首字母大写
        const newPageName = pageName[0].toUpperCase() + pageName.slice(1)

        commit(`store${newPageName}ListData`, result.data)
        resolve(result.code)
      })
    },

    // 删除单条数据
    async deleteListData({ dispatch }, payload) {
      const { id, pageName } = payload

      const result = await deleteListData(`/${pageName}/${id}`)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) reject(result)

        switch (pageName) {
          case 'menu':
            dispatch('login/getUserMenus', null, { root: true })
            break
        }
        resolve(result.code)
      })
    },

    // 新建数据
    async createData({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await createData(`/${pageName}`, data)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) reject(result)
        switch (pageName) {
          case 'menu':
            // 更新用户菜单数据
            dispatch('login/getUserMenus', null, { root: true })
            break
        }
        resolve(result.code)
      })
    },

    // 修改数据
    async alterListData({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await alterListData(`/${pageName}/${data.id}`, data)

      return new Promise((resolve, reject) => {
        if (result.code !== 200) reject(result)

        switch (pageName) {
          case 'menu':
            dispatch('login/getUserMenus', null, { root: true })
            break
        }
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

export { common }
