import { mhRequest } from '../index'
import { IDataType } from '../types'
const getBlogConfigInfo = (): Promise<IDataType> => {
  return mhRequest.get({
    url: '/blog/config'
  })
}

export { getBlogConfigInfo }
