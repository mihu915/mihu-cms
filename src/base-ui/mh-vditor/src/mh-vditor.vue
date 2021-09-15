<template>
  <div class="mh-vditor">
    <div class="vditor-content" id="vditor" ref="vditorRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'

import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { IVditorOption } from '../index'
export default defineComponent({
  props: {
    vditorOptions: {
      type: Object as PropType<IVditorOption>
    }
  },
  setup(props) {
    // const { theme } = props.vditorOptions!
    const vditorRef = ref<HTMLElement>()
    onMounted(() => {
      const vditor = new Vditor(vditorRef.value!, {
        cache: {
          id: 'vditor'
        },
        theme: 'dark', // 编辑器主题
        preview: {
          theme: {
            current: 'dark' // 内容主题,最好随编辑器主题一起
          },
          hljs: {
            enable: true, //代码高亮
            lineNumber: false, //是否启用行号
            style: 'dracula'
          }
        },
        height: 300
      })
    })
    return {
      vditorRef
    }
  }
})
</script>

<style scoped></style>
