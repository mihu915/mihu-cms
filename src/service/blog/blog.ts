import { mhRequest } from '../index'
import { IDataType } from '../types'
import qs from 'qs'

enum BlogAPI {
  BlogInfos = '/blog/infos'
}

enum WriteAPI {
  Write = '/write',
  WriteTag = '/write/tag'
}

const getBlogInfos = (): Promise<IDataType> => {
  return mhRequest.get({
    url: BlogAPI.BlogInfos
  })
}

const editorBlogInfos = (config: any): Promise<IDataType> => {
  return mhRequest.post({
    url: BlogAPI.BlogInfos,
    data: qs.stringify(config),
    showLoading: true,
    showMessage: true
  })
}

// 获取标签数据
const getWriteTag = (): Promise<IDataType> => {
  return mhRequest.post({
    url: `${WriteAPI.WriteTag}/list`
  })
}

// 添加标签
const addWriteTag = (data: any): Promise<IDataType> => {
  return mhRequest.post({
    url: WriteAPI.WriteTag,
    data: qs.stringify(data),
    showMessage: true
  })
}

// 更新文章信息
const updateWriteContent = (id: any, data: any): Promise<IDataType> => {
  return mhRequest.patch({
    url: `${WriteAPI.Write}/${id}`,
    data: qs.stringify(data),
    showMessage: true
  })
}

const deleteWriteTag = (id: number): Promise<IDataType> => {
  return mhRequest.delete({
    url: `${WriteAPI.WriteTag}/` + id,
    showMessage: true
  })
}

const getWriteDataById = (id: any): Promise<IDataType> => {
  return mhRequest.get({
    url: `${WriteAPI.Write}/` + id
  })
}

export {
  getBlogInfos,
  editorBlogInfos,
  getWriteTag,
  addWriteTag,
  deleteWriteTag,
  getWriteDataById,
  updateWriteContent
}
