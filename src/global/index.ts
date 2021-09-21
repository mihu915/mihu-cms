import { App } from 'vue'
import { registerElement } from './register-element'
import { registerProperties } from './register-properties'
import { VMdEditor, VMdPreview } from './register-vmd-editor'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
  app.use(VMdEditor)
  app.use(VMdPreview)
}
