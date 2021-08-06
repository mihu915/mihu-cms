import { App } from 'vue'
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput
} from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
const components = [ElButton, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput]

export function registerElement(app: App): void {
  components.forEach((el) => {
    app.component(el.name, el)
  })
}
