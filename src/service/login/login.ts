import { mhRequest } from '../index'
import type { IAccount, IDataType, ILoginDataType } from './types'
import qs from 'qs'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users'
}

function accountLoginRequest(account: IAccount): Promise<IDataType<ILoginDataType>> {
  return mhRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    data: qs.stringify(account),
    showMessage: true
  })
}

function getUserInfoRequest(): Promise<IDataType> {
  return mhRequest.get({
    url: LoginAPI.LoginUserInfo
  })
}

export { accountLoginRequest, getUserInfoRequest }
