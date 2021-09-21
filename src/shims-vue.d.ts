/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'prismjs'
declare module '@kangc/v-md-editor'
declare let $store: any
declare module '*.json'
declare module '*.js'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor/lib/codemirror-editor'
declare module '@kangc/v-md-editor/lib/preview'
declare module 'codemirror'
declare module 'vue-outline'
