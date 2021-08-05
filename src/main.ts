import App from './App.vue'

import { createApp } from 'vue'
import { router } from '@/router'
import { store } from '@/store'
import { globalRegister } from '@/global/index'

const app = createApp(App)

app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')
