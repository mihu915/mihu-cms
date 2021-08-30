interface IDataType<T = any> {
  code: number
  message?: string
  data?: T
}

export { IDataType }
