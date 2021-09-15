import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootStore, IStoreType } from './types'
import { login } from './login/login'
import { common } from './main/common/common'
import { skill } from './main/analysis/skill'
import { getListData } from '@/service/system/system'

import { stringToNumberArray, arrayToString } from '@/utils'

const store = createStore<IRootStore>({
  state() {
    return {
      name: 'nonke',
      entireRoleData: [],
      entireMenuData: []
    }
  },

  getters: {
    getFilterParentMenuIdList(state) {
      return function (menusId: number[]) {
        if (menusId.length === 0) return []
        const allMenuList = [...state.entireMenuData]
        menusId.map((id, index, array) => {
          allMenuList.map((parentMenu: any) => {
            if (parentMenu.id === id) {
              array.splice(index, 1)
            }
          })
        })
        return menusId
      }
    },

    getAssignMenuName(state, getters) {
      return function (strMenusId: string) {
        let menusTile: any = []
        const menusIdArray = stringToNumberArray(strMenusId)
        const childMenusId = getters.getFilterParentMenuIdList(menusIdArray)

        const allMenuList = [...state.entireMenuData]

        allMenuList.map((parent) => {
          parent.children.map((child: any) => {
            if (childMenusId.includes(child.id)) {
              menusTile.push(child.title)
            }
          })
        })
        menusTile = arrayToString(menusTile)
        return menusTile
      }
    }
  },

  mutations: {
    storageEntireRoleData(state, data) {
      state.entireRoleData = data
    },
    storageEntireMenuData(state, data) {
      state.entireMenuData = data
    }
  },

  actions: {
    async getInitialDataAction({ commit }) {
      // 拿到所有角色列表和菜单的数据
      const roleResult = await getListData('/role/list', true, { offset: 0, limit: 100 })
      const menuResult = await getListData('/menu/list', false, { offset: 0, limit: 100 })
      return new Promise((resolve, reject) => {
        if (roleResult.code !== 200 || menuResult.code !== 200) {
          return reject(roleResult)
        }
        commit('storageEntireRoleData', roleResult.data.list)
        commit('storageEntireMenuData', menuResult.data.list)
        resolve(roleResult)
      })
    },

    // 获取角色全部数据
    async getEntireRoleData({ commit }) {
      const roleResult = await getListData('/role/list', false, { offset: 0, limit: 100 })
      return new Promise((resolve, reject) => {
        if (roleResult.code !== 200) {
          return reject(roleResult)
        }
        commit('storageEntireRoleData', roleResult.data.list)
        resolve(roleResult)
      })
    }
  },

  modules: {
    login,
    common,
    skill
  }
})

// 加载缓存数据
function setupStore() {
  store.dispatch('login/storageUserData')
  store.dispatch('skill/storageEpidemicDataAction')
}

// 自己封装的useStore,兼容ts
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export { store, setupStore }
