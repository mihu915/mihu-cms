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
      writeListData: {
        list: [],
        total_count: 0
      },
      blogMenuListData: {
        list: [],
        total_count: 0
      }
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
    storageRoleListData(state, data) {
      state.roleListData = data
    },
    storageMenuListData(state, data) {
      state.menuListData = data
    },
    storageUserListData(state, data) {
      state.userListData = data
    },
    storageWriteListData(state, data) {
      state.writeListData = data
    },
    storageBlogMenuListData(state, data) {
      state.blogMenuListData = data
    }
  },

  actions: {
    // 获取列表数据
    async pageListDataAction({ commit }, payload) {
      const { isShowLoading, queryInfo, pageName, prefix } = payload

      const result = await getListData(`${prefix}/${pageName}/list`, isShowLoading, queryInfo)

      return new Promise((resolve, reject) => {
        if (result.code !== 200) return reject(result)

        // 将pageName和prefix转成首字母大写
        const newPageName = pageName[0].toUpperCase() + pageName.slice(1)
        const newPrefix = prefix[0].toUpperCase() + prefix.slice(1)

        commit(`storage${newPrefix}${newPageName}ListData`, result.data)

        switch (pageName) {
          case 'menu':
            commit('storageEntireMenuData', result.data.list, { root: true })
            break
        }
        resolve(result.code)
      })
    },

    // 删除单条数据
    async deleteListData({ dispatch }, payload) {
      const { id, pageName } = payload

      const result = await deleteListData(`/${pageName}/${id}`)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) return reject(result)

        switch (pageName) {
          case 'menu':
            dispatch('login/getUserMenus', null, { root: true })
            break
          case 'role':
            dispatch('getEntireRoleData', null, { root: true })
            break
        }
        resolve(result.code)
      })
    },

    // 新建数据
    async createDataAction({ dispatch }, payload) {
      const { pageName, data } = payload
      const result = await createData(`/${pageName}`, data)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) return reject(result)
        switch (pageName) {
          case 'menu':
            // 更新用户菜单数据
            dispatch('login/getUserMenus', null, { root: true })
            break
          case 'role':
            dispatch('getEntireRoleData', null, { root: true })
            break
        }
        resolve(result)
      })
    },

    // 修改数据
    async alterListDataAction({ dispatch, rootState }, payload) {
      const { pageName, data } = payload
      const result = await alterListData(`/${pageName}/${data.id}`, data)

      return new Promise((resolve, reject) => {
        if (result.code !== 200) return reject(result)

        switch (pageName) {
          case 'menu':
            dispatch('login/getUserMenus', null, { root: true })
            break
          case 'role':
            dispatch('getEntireRoleData', null, { root: true })
            break
          case 'user':
            if ((rootState as any).login.userInfo.id === data.id) {
              dispatch('login/updateUserInfo', null, { root: true })
            }
            break
        }
        resolve(result)
      })
    },

    // 切换用户状态
    async switchUserEnable(context, payload) {
      const { id, role_id } = payload
      const enable = payload.enable ? 0 : 1
      const result = await userEnable(id, enable, role_id)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) return reject(result)
        resolve(enable)
      })
    }
  }
}

export { common }
