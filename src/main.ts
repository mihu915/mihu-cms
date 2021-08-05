import App from './App.vue'
import MHRequest from '@/service/index'

import { createApp } from 'vue'
import { router } from '@/router'
import { store } from '@/store'
import { globalRegister } from '@/global/index'
// import '@/service/axios-demo'

const app = createApp(App)
MHRequest.request({
  url: '/get',
  method: 'get',
  params: {
    name: 'mihu',
    age: 123
  }
})

app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')
