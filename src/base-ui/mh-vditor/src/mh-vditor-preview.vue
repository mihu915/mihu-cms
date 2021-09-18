<template>
  <div class="mh-vditor-preview">
    <div class="outline" ref="outlineRef"></div>
    <div class="vditor-reset" ref="previewRef"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import 'vditor/dist/index.css'
import Vditor from 'vditor'

export default defineComponent({
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const previewRef = ref<HTMLDivElement>()
    const markdown = computed(() => props.markdown)
    const outlineRef = ref<HTMLElement>()
    const preview = () => {
      Vditor.preview(previewRef.value!, markdown.value || '未编写内容', {
        mode: 'dark',
        theme: {
          current: 'dark'
        },
        anchor: 1,
        hljs: {
          enable: true, //代码高亮
          lineNumber: true, //是否启用行号
          style: 'dracula'
        }
      })
      Vditor.outlineRender(previewRef.value!, outlineRef.value!)
    }

    watch(markdown, () => {
      preview()
    })

    onMounted(() => {
      preview()
    })

    return {
      previewRef,
      outlineRef
    }
  }
})
</script>

<style scoped>
.mh-vditor-preview {
  height: 100%;
}

.vditor-reset {
  display: inline-block;
}
</style>
