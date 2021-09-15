import { Module } from 'vuex'

import { IEpidemicData } from './types'
import { IRootStore } from '@/store/types'

import { epidemicApi } from '@/service/epidemic/epidemic'
const skill: Module<IEpidemicData, IRootStore> = {
  namespaced: true,
  state() {
    return {
      epidemicData: {}
    }
  },
  getters: {
    // 获取疫情各区域的总数据
    getTotalConfirmData(state, getters) {
      const totalConfirmData = state.epidemicData.children.map((item: any) => {
        return { name: item.name, value: item.total.confirm }
      })
      return totalConfirmData
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
        if (epidemicData.code !== 200) return reject(epidemicData)
        console.log(epidemicData.data)
        commit('storageEpidemicData', epidemicData.data)

        resolve(epidemicData)
      })
    }
  },
  modules: {}
}

export { skill }
