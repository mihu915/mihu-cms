import MHRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'
const mhRequest = new MHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      console.log('拦截请求成功： ', config)
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log(err)
      return err
    },
    responseInterceptors: (res) => {
      console.log('拦截响应成功： ', res.data)
      return res.data
    },
    responseInterceptorsCatch: (err) => {
      console.log(err)
      return err
    }
  }
})
export default mhRequest
