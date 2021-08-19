import { mhRequest } from '../index'
import type { IAccount, IDataType, ILoginDataType } from './types'
import qs from 'qs'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users',
  UserMenu = '/menu'
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

function getUserMenu(): Promise<IDataType> {
  return mhRequest.get({
    url: LoginAPI.UserMenu
  })
}

export { accountLoginRequest, getUserInfoRequest, getUserMenu }
