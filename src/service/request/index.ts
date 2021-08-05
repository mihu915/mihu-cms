import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MHRequestConfig, MHRequestInterceptors } from './type'

class MHRequest {
  instance: AxiosInstance
  interceptors?: MHRequestInterceptors
  constructor(config: MHRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 对应实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求拦截成功')
        return config
      },
      (err) => {
        console.log('请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('响应拦截成功')
        return res
      },
      (err) => {
        console.log('响应拦截失败')
        return err
      }
    )
  }

  request(config: MHRequestConfig): void {
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    console.log(config)
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors.responseInterceptors(res)
      }
      console.log(res)
    })
  }
}

export default MHRequest
