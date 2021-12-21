<template>
  <div class="mh-vditor-preview">
    <div class="preview" ref="previewRef" @scroll="handleScroll"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default defineComponent({
  props: {
    markdownText: {
      type: String,
      default: ''
    },
    isShowOutline: {
      type: Boolean,
      default: true
    },
    outlineWidth: {
      type: Number,
      default: 200
    }
  },
  emits: ['previewAfter'],
  setup(props, { emit }) {
    const previewRef = ref<HTMLDivElement>()
    const outlineRef = ref<HTMLElement>()
    const markdown = computed(() => props.markdownText)

    // 渲染方法
    const renderPreview = async () => {
      await Vditor.preview(previewRef.value!, markdown.value, {
        mode: 'dark',
        // theme: {
        //   current: 'dark'
        // },
        hljs: {
          style: 'dracula',
          enable: true,
          lineNumber: true
        },
        after() {
          emit('previewAfter', previewRef.value)
        }
      })
    }

    // 渲染Markdown
    onMounted(() => {
      if (typeof props.markdownText === 'string' && props.markdownText.length) {
        renderPreview()
      }
      watch(markdown, () => {
        renderPreview()
      })
    })

    return {
      previewRef,
      outlineRef
    }
  }
})
</script>

<style>
.mh-vditor-preview {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.preview {
  /* background-color: #2f363d; */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
}

.mh-vditor-preview::-webkit-scrollbar {
  display: none;
}

.preview::-webkit-scrollbar {
  display: none;
}
</style>
