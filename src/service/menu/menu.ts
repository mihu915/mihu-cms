import { mhRequest } from '../index'
import { IDataType } from '../types'

import qs from 'qs'
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

export { createMenu, deleteMenu }
