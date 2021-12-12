import { Module } from 'vuex'

import { IEpidemicData } from './types'
import { IRootStore } from '@/store/types'

import { epidemicApi } from '@/service/epidemic/epidemic'
import { localCache } from '@/utils'
import { getOperatorLog } from '@/service/log/operator-log'
const skill: Module<IEpidemicData, IRootStore> = {
  namespaced: true,
  state() {
    return {
      epidemicData: {},
      operatorLog: []
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
    },
    storageOperatorLogData(state, data) {
      state.operatorLog = data
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

    // 请求操作日志数据
    async operatorLogAction({ commit }, option) {
      const operatorLogData: any = await getOperatorLog(option)
      return new Promise((resolve, reject) => {
        if (operatorLogData.code !== 200) return reject(operatorLogData)
        commit('storageOperatorLogData', operatorLogData.data)
        resolve(operatorLogData)
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
