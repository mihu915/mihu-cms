<template>
  <div class="mh-vditor">
    <div class="vditor-content" id="vditor" ref="vditorRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'

import { IVditorOptions } from '../types'

export default defineComponent({
  props: {
    vditorOptions: {
      type: Object
    }
  },
  emits: ['clickSave'],
  setup(props, { emit }) {
    const vditorRef = ref<HTMLElement>()
    const vditor = ref<Vditor>()

    onMounted(() => {
      vditor.value = new Vditor(vditorRef.value!, {
        cache: {
          id: 'vditor',
          enable: false
        },

        theme: 'dark', // 编辑器主题
        height: '100%',
        width: '100%',
        // mode: 'ir',
        tab: '\t',
        icon: 'ant',
        typewriterMode: true,
        // 是否显示大纲
        outline: {
          enable: true,
          position: 'left'
        },
        toolbar: [
          {
            name: 'save',
            tip: '保存',
            tipPosition: 'n',
            icon: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1631874897503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2669" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M853.172706 0H90.352941C40.538353 0 0 40.538353 0 90.352941v843.294118c0 49.814588 40.538353 90.352941 90.352941 90.352941h843.294118c49.814588 0 90.352941-40.538353 90.352941-90.352941V167.213176L853.172706 0zM481.882353 60.235294v240.941177h180.705882V60.235294h60.235294v301.176471H240.941176V60.235294h240.941177zM180.705882 963.764706v-361.411765h662.588236v361.411765H180.705882z m783.058824-30.117647c0 16.564706-13.552941 30.117647-30.117647 30.117647H903.529412V542.117647H120.470588v421.647059h-30.117647a30.117647 30.117647 0 0 1-30.117647-30.117647v-843.294118a30.117647 30.117647 0 0 1 30.117647-30.117647H180.705882v361.411765h602.352942V60.235294h45.537882L963.764706 192.512V933.647059z" p-id="2670" fill="#b9b9b9"></path></svg>',
            click() {
              emit('clickSave')
            }
          },
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          'upload',
          'record',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'fullscreen',
          'edit-mode',
          {
            name: 'more',
            toolbar: [
              'both',
              'code-theme',
              'content-theme',
              'export',
              'outline',
              'preview',
              'devtools',
              'info',
              'help'
            ]
          }
        ],
        toolbarConfig: {
          pin: true
        },

        // 预览设置
        preview: {
          theme: {
            current: 'dark' // 内容主题,最好随编辑器主题一起
          },

          markdown: {
            toc: true
          },

          hljs: {
            enable: true, //代码高亮
            lineNumber: true, //是否启用行号
            style: 'dracula'
          }
        }
      })
    })

    return {
      vditorRef,
      vditor
    }
  }
})
</script>

<style scoped>
.mh-vditor {
  width: 100%;
  height: 100%;
}
.test {
  color: aliceblue;
}
</style>
