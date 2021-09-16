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

  setup(props) {
    const vditorRef = ref<HTMLElement>()
    const vditor = ref<Vditor>()

    onMounted(() => {
      vditor.value = new Vditor(vditorRef.value!, {
        cache: {
          id: 'vditor'
        },

        theme: 'dark', // 编辑器主题
        height: 300,
        width: '100%',
        // mode: 'ir',
        tab: '\t',
        icon: 'ant',
        value: 'kkkkk',
        typewriterMode: true,
        // 是否显示大纲
        outline: {
          enable: true,
          position: 'left'
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

<style scoped></style>
