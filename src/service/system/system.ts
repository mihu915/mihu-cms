import { mhRequest } from '../index'
import { IDataType } from '../types'
import qs from 'qs'

// 获取列表数据
const getListData = (url: string, queryInfo?: any): Promise<IDataType> => {
  return mhRequest.get({
    url,
    params: queryInfo
  })
}

// 根据id删除一条数据
const deleteListData = (url: string): Promise<IDataType> => {
  return mhRequest.delete({
    url,
    showMessage: true
  })
}

const createData = (url: string, data: any): Promise<IDataType> => {
  return mhRequest.post({
    url,
    data: qs.stringify(data),
    showMessage: true
  })
}

const alterListData = (url: string, data: any): Promise<IDataType> => {
  return mhRequest.patch({
    url,
    data: qs.stringify(data),
    showMessage: true
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
    showMessage: true
  })
}
export { createData, deleteListData, alterListData, getListData, userEnable }
