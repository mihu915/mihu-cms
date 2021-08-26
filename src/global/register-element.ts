import { App } from 'vue'
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElRow,
  ElCol,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElDatePicker
} from 'element-plus'

import 'element-plus/lib/theme-chalk/index.css'

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElRow,
  ElCol,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElDatePicker
]

export function registerElement(app: App): void {
  components.forEach((el) => {
    app.component(el.name, el)
  })
}
