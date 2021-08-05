import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MHRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorsCatch?: (error: any) => any
}

export interface MHRequestConfig extends AxiosRequestConfig {
  interceptors?: MHRequestInterceptors
}
