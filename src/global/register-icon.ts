import { App } from 'vue'
import { ArrowLeft, QuestionFilled } from '@element-plus/icons'
const icons = [ArrowLeft, QuestionFilled]
export function registerIcon(app: App): void {
  icons.forEach((icon) => {
    app.component(icon.name, icon)
  })
}
