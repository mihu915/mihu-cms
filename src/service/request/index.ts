import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

interface MHRequestInterceptors {
  requestInterceptors: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch: (error: any) => any
  responseInterceptors: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch: (error: any) => any
}

interface MHRequestConfig extends AxiosRequestConfig {
  interceptors: MHRequestInterceptors
}

class MHRequest {
  instance: AxiosInstance
  interceptors: MHRequestInterceptors
  constructor(config: MHRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors.requestInterceptors,
      this.interceptors.requestInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors.responseInterceptors,
      this.interceptors.responseInterceptorsCatch
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default MHRequest
