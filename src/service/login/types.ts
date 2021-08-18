interface IAccount {
  username: string
  password: string
}

interface IUserInfoParams {
  username: string
}

interface IDataType<T = any> {
  code: number
  message?: string
  data?: T
}

interface ILoginDataType {
  id: number
  token: string
  username: string
}

export { IAccount, IDataType, ILoginDataType, IUserInfoParams }
