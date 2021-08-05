import { App } from 'vue'
import { ElButton } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
const components = [ElButton]

export function registerElement(app: App): void {
  components.forEach((el) => {
    app.component(el.name, el)
  })
}
