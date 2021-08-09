interface IAccount {
  username: string
  password: string
}
interface IDataType<T = any> {
  code: number
  message?: string
  data: T
}

export { IAccount, IDataType }
