import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { MHRequestConfig, MHRequestInterceptors } from './type'

import { ElLoading, ElMessage } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

import { router } from '@/router'
import { localCache } from '@/utils'
// showLoading的默认值为false
const DEFAULT_LOADING = false
const DEFAULT_MESSAGE = false
const DEFAULT_ERROR_MESSAGE = true

class MHRequest {
  // 初始化值
  instance: AxiosInstance
  interceptors?: MHRequestInterceptors
  loading?: ILoadingInstance
  showLoading?: boolean
  showMessage?: boolean
  showErrorMessage?: boolean

  constructor(config: MHRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.showMessage = config.showMessage ?? DEFAULT_MESSAGE
    this.showErrorMessage = config.showErrorMessage ?? DEFAULT_ERROR_MESSAGE
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
        // 拦截时判断showLoading是否为true,如果为true,则开启loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading...',
            background: 'rgba(0,0,0,0.7)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 如果showLoading为true则拦截到响应后要关闭loading动画
        if (this.showLoading) this.loading?.close()

        // 展示提示信息
        if (res.data.code === 200) {
          // 如果开启展示message则弹出提示

          if (this.showMessage) {
            ElMessage({
              message: res.data.message,
              type: 'success'
            })
          }
        } else {
          let message: any

          // 如果拦截到权限错误，则直接跳转至login并删除缓存
          if (res.data.code === 401) {
            message = '登录已过期'
            router.replace('/login')
            localCache.clearCache()
          } else {
            message = res.data.message
          }
          if (this.showErrorMessage) {
            ElMessage({
              message,
              type: 'error'
            })
          }
        }
        return res.data
      },
      (err) => {
        console.log(err)
        if (this.showErrorMessage) {
          // 展示提示信息
          ElMessage({
            message: err.response.statusText,
            type: 'error'
          })
        }

        // 关闭loading动画
        if (this.showLoading) this.loading?.close()
        return null
      }
    )
  }

  request<T>(config: MHRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.showLoading = config.showLoading ?? DEFAULT_LOADING
      this.showMessage = config.showMessage ?? DEFAULT_MESSAGE
      this.showErrorMessage = config.showErrorMessage ?? DEFAULT_ERROR_MESSAGE

      // 保存config处理后的数据
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // 执行发送网络请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res)
          this.showErrorMessage = DEFAULT_ERROR_MESSAGE
          this.showMessage = DEFAULT_MESSAGE
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.showErrorMessage = DEFAULT_ERROR_MESSAGE
          this.showMessage = DEFAULT_MESSAGE
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: MHRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'get' })
  }

  post<T>(config: MHRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'post' })
  }

  delete<T>(config: MHRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'delete' })
  }

  patch<T>(config: MHRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'patch' })
  }
}

export default MHRequest
