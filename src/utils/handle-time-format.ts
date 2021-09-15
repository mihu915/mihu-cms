import dayjs from 'dayjs'

// 处理时间戳
const handleUnixFormat = (unix: number, format?: string) => {
  const finalFormat = format ? format : 'YYYY-MM-DD HH:mm:ss'
  const date = dayjs.unix(unix).format(finalFormat)

  return date
}

// 当前时段
const getNowTimeFrameByUnix = () => {
  let timeFrame

  const nowHour = parseInt(dayjs.unix(Date.now() / 1000).format('HH'))
  const nowTime = parseInt(dayjs.unix(Date.now() / 1000).format('YYYY-MM-DD HH:mm:ss'))
  if (nowHour > 0 && nowHour <= 6) {
    timeFrame = '凌晨好'
  } else if (nowHour > 6 && nowHour <= 12) {
    timeFrame = '上午好'
  } else if (nowHour > 12 && nowHour <= 18) {
    timeFrame = '下午好'
  } else {
    timeFrame = '晚上好'
  }

  return {
    timeFrame,
    nowTime
  }
}
export { handleUnixFormat, getNowTimeFrameByUnix }
