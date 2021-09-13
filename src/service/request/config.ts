let BASE_URL = ''
let epidemic_URL = ''
const TIME_OUT = 10000
switch (process.env.NODE_ENV) {
  case 'development':
    // 开发环境
    BASE_URL = '/api'
    epidemic_URL = '/epidemic'
    break
  case 'test':
    // 测试环境
    BASE_URL = ''
    break
  case 'production':
    // 生产环境
    BASE_URL = 'http://47.111.81.205:1118'
    epidemic_URL = 'https://c.m.163.com/ug/api/wuhan/app/data/list-total'
    break
  default:
    break
}

console.log(process.env.NODE_ENV)

export { BASE_URL, TIME_OUT, epidemic_URL }
