import { Module } from 'vuex'

import { IEpidemicData } from './types'
import { IRootStore } from '@/store/types'

import { epidemicApi } from '@/service/epidemic/epidemic'
const skill: Module<IEpidemicData, IRootStore> = {
  namespaced: true,
  state() {
    return {
      epidemicData: {
        areaTree: [],
        chinaDayList: [],
        chinaTotal: {}
      }
    }
  },
  getters: {
    // 获取疫情各区域的总数据
    getChinaAreaData(state, getters) {
      console.log(getters.getChinaTotalExtData)
      const areaTotalData = getters.getChinaTotalExtData.children.map((item: any) => {
        return { name: item.name, value: item.total.confirm }
      })
      return areaTotalData
    },

    getChinaTotalExtData(state) {
      const result = state.epidemicData.areaTree.find((item: any) => {
        if (item.name === '中国') {
          return item
        }
      })
      return result
    }
  },
  mutations: {
    storageEpidemicData(state, data) {
      state.epidemicData = data
    }
  },
  actions: {
    async getEpidemicDataAction({ commit }) {
      const epidemicData: any = await epidemicApi()
      return new Promise((resolve, reject) => {
        if (epidemicData.code !== 10000) return reject(epidemicData)
        commit('storageEpidemicData', epidemicData.data)

        resolve(epidemicData)
      })
    }
  },
  modules: {}
}

export { skill }
