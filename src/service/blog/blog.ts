import { mhRequest } from '../index'
import { IDataType } from '../types'

import qs from 'qs'
const getBlogConfigInfo = (): Promise<IDataType> => {
  return mhRequest.get({
    url: '/blog/config'
  })
}

const editorBlogConfig = (config: any): Promise<IDataType> => {
  return mhRequest.post({
    url: '/blog/config',
    data: qs.stringify(config),
    showLoading: true,
    showMessage: true
  })
}

export { getBlogConfigInfo, editorBlogConfig }
