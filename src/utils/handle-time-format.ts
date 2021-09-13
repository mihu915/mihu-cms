import dayjs from 'dayjs'

// 处理时间戳
const handleUnixFormat = (unix: number, format?: string) => {
  const finalFormat = format ? format : 'YYYY-MM-DD HH:mm:ss'
  const date = dayjs.unix(unix).format(finalFormat)

  return date
}

// 当前时段
const getNowTimeFrameByUnix = () => {
  const nowTimeFrame = dayjs.unix(Date.now() / 1000).format('A')
  let timeFrame
  if (nowTimeFrame === 'AM') {
    timeFrame = '上午好'
  } else if (nowTimeFrame === 'PM') {
    timeFrame = '下午好'
  }
  const nowTime = dayjs.unix(Date.now() / 1000).format('HH时mm分')

  return {
    timeFrame,
    nowTime
  }
}
export { handleUnixFormat, getNowTimeFrameByUnix }
