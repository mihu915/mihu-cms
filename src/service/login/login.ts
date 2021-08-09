import { mhRequest } from '../index'
import type { IAccount, IDataType } from './types'
import qs from 'qs'

function accountLoginRequest(account: IAccount): Promise<IDataType> {
  // const data = {
  //   name: account.username,
  //   password: account.password
  // }
  return mhRequest.post<IDataType>({
    url: '/login',
    data: qs.stringify(account)
  })
}

export { accountLoginRequest }
