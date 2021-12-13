import { Module } from 'vuex'
import { IBlogStore } from './types'
import { IRootStore } from '../../types'

import {
  getBlogInfos,
  editorBlogInfos,
  getWriteTag,
  addWriteTag,
  deleteWriteTag
} from '@/service/blog/blog'
const blog: Module<IBlogStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      blogConfig: {},
      writeTagData: []
    }
  },
  getters: {},
  mutations: {
    storageBlogConfig(state, data) {
      state.blogConfig = data
    },
    storageWriteData(state, data) {
      state.writeTagData = data
    }
  },
  actions: {
    // 请求标签数据
    async writeTagDataAction({ commit }) {
      const result = await getWriteTag()
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          reject(result)
        } else {
          commit('storageWriteData', result.data)
          resolve(result)
        }
      })
    },

    async addWriteTagAction({ dispatch }, data) {
      const result = await addWriteTag(data)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          reject(result)
        } else {
          dispatch('writeTagDataAction')
          resolve(result)
        }
      })
    },

    // 删除标签
    async deleteWriteTag({ dispatch }, id) {
      const result = await deleteWriteTag(id)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          reject(result)
        } else {
          dispatch('writeTagDataAction')
          return resolve(result)
        }
      })
    },

    // 获取博客配置信息
    async blogConfigInfoAction({ commit }) {
      const result = await getBlogInfos()
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          return reject(result)
        }
        commit('storageBlogConfig', result.data)
        resolve(result)
      })
    },

    // 编辑博客配置信息
    async editorBlogConfigAction({ dispatch }, config) {
      const result = await editorBlogInfos(config)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          return reject(result)
        }
        dispatch('blogConfigInfoAction')
        return resolve(result)
      })
    }
  },
  modules: {}
}

export { blog }
