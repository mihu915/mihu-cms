import type { AxiosRequestConfig } from 'axios'

export interface MHRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: any) => any
  responseInterceptorsCatch?: (error: any) => any
}

export interface MHRequestConfig extends AxiosRequestConfig {
  interceptors?: MHRequestInterceptors
  showLoading?: boolean
  showMessage?: boolean
}
