import { IDataType } from '../types'

interface IAccount {
  username: string
  password: string
}

interface IUserInfoParams {
  username: string
}

interface ILoginDataType {
  id: number
  token: string
  username: string
}

export { IAccount, IDataType, ILoginDataType, IUserInfoParams }
