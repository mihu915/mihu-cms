import App from './App.vue'

import { createApp } from 'vue'
import { router } from '@/router'
import { store } from '@/store'
import { globalRegister } from '@/global/index'
import { setupStore } from '@/store'

import 'normalize.css'
import './assets/css/index.less'
// import '@/service/axios-demo'

const app = createApp(App)
// 注册element-plus
app.use(globalRegister)

app.use(store)

setupStore()

app.use(router)

app.mount('#app')
