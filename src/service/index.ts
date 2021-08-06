import MHRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'
const mhRequest = new MHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestInterceptors: (config) => {
      console.log('单个实例拦截请求成功')
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log(err)
      return err
    },
    responseInterceptors: (res) => {
      console.log('单个实例拦截响应成功')
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log(err)
      return err
    }
  }
})
export default mhRequest
