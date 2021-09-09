import dayjs from 'dayjs'

// 处理时间戳
const handleUnixFormat = (unix: number, format?: string) => {
  const finalFormat = format ? format : 'YYYY-MM-DD HH:mm:ss'
  const date = dayjs.unix(unix).format(finalFormat)

  return date
}
export { handleUnixFormat }
