import { mhRequest } from '../index'
import { IDataType } from '../types'
import qs from 'qs'

// 获取列表数据
const getListData = (url: string, showLoading?: boolean, queryInfo?: any): Promise<IDataType> => {
  let isShowLoading = true
  if (showLoading === false) {
    isShowLoading = showLoading
  }

  return mhRequest.post({
    url,
    showLoading: isShowLoading,
    data: qs.stringify(queryInfo)
  })
}

// 根据id删除一条数据
const deleteListData = (url: string): Promise<IDataType> => {
  return mhRequest.delete({
    url,
    showMessage: true,
    showLoading: true
  })
}

const createData = (url: string, data: any): Promise<IDataType> => {
  return mhRequest.post({
    url,
    data: qs.stringify(data),
    showLoading: true,
    showMessage: true
  })
}

const alterListData = (url: string, data: any): Promise<IDataType> => {
  return mhRequest.patch({
    url,
    data: qs.stringify(data),
    showMessage: true,
    showLoading: true
  })
}

// 切换用户状态
const userEnable = (id: number, enable: number, role_id: number): Promise<IDataType> => {
  return mhRequest.get({
    url: `/user/enable/${id}`,
    params: {
      enable,
      role_id
    },
    showMessage: true,
    showLoading: true
  })
}
export { createData, deleteListData, alterListData, getListData, userEnable }
