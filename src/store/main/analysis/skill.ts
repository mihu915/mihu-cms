import { Module } from 'vuex'

import { IEpidemicData } from './types'
import { IRootStore } from '@/store/types'

import { epidemicApi } from '@/service/epidemic/epidemic'
import { localCache } from '@/utils'
const skill: Module<IEpidemicData, IRootStore> = {
  namespaced: true,
  state() {
    return {
      epidemicData: {}
    }
  },
  getters: {
    // 获取中国疫情各区域的总数据
    getTotalConfirmData(state) {
      const totalConfirmData = state.epidemicData.children.map((item: any) => {
        return { name: item.name, value: item.total.confirm }
      })
      return totalConfirmData
    }
  },
  mutations: {
    storageEpidemicData(state, data) {
      state.epidemicData = data
      localCache.setCache('epidemicData', data)
    }
  },
  actions: {
    // 请求疫情数据
    async getEpidemicDataAction({ commit }) {
      const epidemicData: any = await epidemicApi()
      return new Promise((resolve, reject) => {
        if (epidemicData.code !== 200) return reject(epidemicData)
        commit('storageEpidemicData', epidemicData.data)
        resolve(epidemicData)
      })
    },
    async storageEpidemicDataAction({ commit, dispatch }) {
      const epidemicData = localCache.getCache('epidemicData')
      if (epidemicData) {
        commit('storageEpidemicData', epidemicData)
      } else {
        dispatch('getEpidemicDataAction')
      }
    }
  },
  modules: {}
}

export { skill }
