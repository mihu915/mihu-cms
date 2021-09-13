import MHRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'
import { localCache } from '@/utils'

const mhRequest = new MHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 单个实例拦截器
  interceptors: {
    // 请求成功拦截
    requestInterceptors: (config) => {
      const token = localCache.getCache('token')
      config.headers.Authorization = `Bearer ${token}`
      return config
    },
    // 请求失败
    requestInterceptorsCatch: (err) => {
      return err
    },
    // 响应成功拦截
    responseInterceptors: (res) => {
      return res
    }
    // 响应失败拦截
    // responseInterceptorsCatch: (err) => {}
  }
})
export { mhRequest }
