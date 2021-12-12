import { mhRequest } from '../index'
import { IDataType } from '../types'

import qs from 'qs'
const getBlogInfos = (): Promise<IDataType> => {
  return mhRequest.get({
    url: '/blog/infos'
  })
}

const editorBlogInfos = (config: any): Promise<IDataType> => {
  return mhRequest.post({
    url: '/blog/infos',
    data: qs.stringify(config),
    showLoading: true,
    showMessage: true
  })
}

// const getWriteTag = () => {

// }

export { getBlogInfos, editorBlogInfos }
