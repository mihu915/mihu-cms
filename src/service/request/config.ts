let BASE_URL = ''
const TIME_OUT = 10000
switch (process.env.NODE_ENV) {
  case 'development':
    // 开发环境
    BASE_URL = 'http://localhost:1118'
    break
  case 'test':
    // 测试环境
    BASE_URL = ''
    break
  case 'production':
    // 生产环境
    BASE_URL = 'http://152.136.185.210:5000'
    break
  default:
    break
}

console.log(process.env.NODE_ENV)

export { BASE_URL, TIME_OUT }
