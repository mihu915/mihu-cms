import { Module } from 'vuex'
import { IBlogStore } from './types'
import { IRootStore } from '../../types'

import {
  getBlogInfos,
  editorBlogInfos,
  getWriteTag,
  addWriteTag,
  deleteWriteTag,
  getWriteDataById,
  updateWriteContent
} from '@/service/blog/blog'

const blog: Module<IBlogStore, IRootStore> = {
  namespaced: true,

  state() {
    return {
      blogConfig: {},
      writeData: {},
      writeTagData: {
        list: [],
        total_count: 0
      }
    }
  },

  getters: {
    // 获取标签名称
    getTagName(state) {
      let tagName: any
      return function (id: number) {
        state.writeTagData.list.forEach((item: any) => {
          if (item.id === id) tagName = item.tag_name
        })
        return tagName
      }
    }
  },

  mutations: {
    storageBlogConfig(state, data) {
      state.blogConfig = data
    },

    storageWriteTagData(state, data) {
      state.writeTagData = data
    },

    storageWriteData(state, data) {
      state.writeData = data
    }
  },
  actions: {
    // 获取单个文章数据
    async writeDataAction({ commit }, id) {
      const result = await getWriteDataById(id)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) reject(result)
        else {
          commit('storageWriteData', result.data)
          resolve(result)
        }
      })
    },

    // 请求标签数据
    async writeTagDataAction({ commit }) {
      const result = await getWriteTag()
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          reject(result)
        } else {
          commit('storageWriteTagData', result.data)
          resolve(result)
        }
      })
    },

    // 创建标签
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
    },

    // 更新文章内容
    async updateWriteContentAction({ dispatch }, payload) {
      const { id, info } = payload
      const result = await updateWriteContent(id, info)
      return new Promise((resolve, reject) => {
        if (result.code !== 200) {
          reject(result)
        } else {
          dispatch('writeDataAction', id)
          resolve(result)
        }
      })
    }
  },
  modules: {}
}

export { blog }
