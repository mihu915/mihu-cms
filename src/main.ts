import App from './App.vue'

import { createApp } from 'vue'
import { router } from '@/router'
import { store } from '@/store'
import { globalRegister } from '@/global/index'

import 'normalize.css'
import './assets/css/index.less'
// import '@/service/axios-demo'

const app = createApp(App)

app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')
