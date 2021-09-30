import { Module } from 'vuex'
import { IBlogStore } from './types'
import { IRootStore } from '../../types'

import { getBlogConfigInfo, editorBlogConfig } from '@/service/blog/blog'
const blog: Module<IBlogStore, IRootStore> = {
  namespaced: true,
  state() {
    return {
      blogConfig: {}
    }
  },
  getters: {},
  mutations: {
    storageBlogConfig(state, data) {
      state.blogConfig = data
    }
  },
  actions: {
    async blogConfigInfoAction({ commit }) {
      const result = await getBlogConfigInfo()
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          return reject(result)
        }
        commit('storageBlogConfig', result.data)
        resolve(result)
      })
    },
    async editorBlogConfigAction(store, config) {
      const result = await editorBlogConfig(config)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          return reject(result)
        }
        store.dispatch('blogConfigInfoAction')
        return resolve(result)
      })
    }
  },
  modules: {}
}

export { blog }
