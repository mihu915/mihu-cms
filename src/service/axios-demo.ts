import axios from 'axios'

// axios的配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 5000
// axios.defaults.headers = {}

// axios
//   .get('/get', {
//     params: {
//       name: 'nonke',
//       age: 134
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('/post', {
//     data: {
//       name: 'hhh',
//       age: 123123
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

axios.all([axios.get('/get'), axios.post('/post')]).then((res) => {
  console.log(res[0].data)
  console.log(res[1].data)
})

axios
  .get('/get', {
    params: {
      name: 'kkk',
      age: 19
    }
  })
  .then((res) => {
    console.log(res)
  })

// 拦截器
// 请求拦截
axios.interceptors.request.use(
  (config) => {
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log(err)
    return err
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log('响应拦截成功')
    return res.data
  },
  (err) => {
    console.log(err)
    return err
  }
)
