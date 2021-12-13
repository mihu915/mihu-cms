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

// 获取标签数据
const getWriteTag = (): Promise<IDataType> => {
  return mhRequest.post({
    url: '/write/tag/list'
  })
}

// 添加标签
const addWriteTag = (data: any): Promise<IDataType> => {
  return mhRequest.post({
    url: '/write/tag',
    data: qs.stringify(data),
    showMessage: true
  })
}

const deleteWriteTag = (id: number): Promise<IDataType> => {
  return mhRequest.delete({
    url: '/write/tag/' + id,
    showMessage: true
  })
}

export { getBlogInfos, editorBlogInfos, getWriteTag, addWriteTag, deleteWriteTag }
