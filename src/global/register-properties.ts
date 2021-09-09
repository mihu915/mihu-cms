import { App } from 'vue'

import { handleUnixFormat } from '@/utils'

function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: number, format?: string) {
      return handleUnixFormat(value, format)
    }
  }
}

export { registerProperties }
