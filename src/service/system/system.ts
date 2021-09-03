import { mhRequest } from '../index'
import { IDataType } from '../types'
import qs from 'qs'

const getListData = (url: string, queryInfo: any): Promise<IDataType> => {
  return mhRequest.get({
    url,
    params: queryInfo
  })
}

const createMenu = (data: any): Promise<IDataType> => {
  return mhRequest.post({
    url: 'menu',
    data: qs.stringify(data),
    showMessage: true
  })
}

const deleteMenu = (id: number): Promise<IDataType> => {
  return mhRequest.delete({
    url: `menu/${id}`,
    showMessage: true
  })
}

const alterMenu = (menuData: any): Promise<IDataType> => {
  return mhRequest.post({
    url: `menu/${menuData.id}/alter`,
    data: qs.stringify(menuData),
    showMessage: true
  })
}

export { createMenu, deleteMenu, alterMenu, getListData }
