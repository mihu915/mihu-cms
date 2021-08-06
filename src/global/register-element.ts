import { App } from 'vue'
import { ElButton, ElTabs, ElTabPane } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
const components = [ElButton, ElTabs, ElTabPane]

export function registerElement(app: App): void {
  components.forEach((el) => {
    app.component(el.name, el)
  })
}
