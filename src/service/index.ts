import MHRequest from './request'

import { BASE_URL, TIME_OUT } from './request/config'
const mhRequest = new MHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      console.log(config)
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log(err)
      return err
    },
    responseInterceptors: (res) => {
      console.log(res)
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log(err)
      return err
    }
  }
})
export default mhRequest
