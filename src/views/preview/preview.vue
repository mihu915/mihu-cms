<template>
  <div class="write-preview">
    <div class="preview-header" :class="{ isScroll }">
      <mh-breadcrumb :breadcrumbs="breadcrumbs" :style="breadcrumbStyle"></mh-breadcrumb>
    </div>
    <div class="write-preview-content">
      <div class="preview-outline">
        <mh-outline :previewElement="previewElement"></mh-outline>
      </div>

      <div class="preview-content">
        <mh-vditor-preview
          :markdownText="markdownText"
          @previewAfter="previewAfter"
        ></mh-vditor-preview>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import MhVditorPreview from '@/base-ui/mh-vditor-preview'
import MhOutline from '@/base-ui/mh-outline'
import MhBreadcrumb from '@/base-ui/mh-breadcrumb'

export default defineComponent({
  components: { MhVditorPreview, MhOutline, MhBreadcrumb },
  setup() {
    const store = useStore()
    const route = useRoute()
    const headerOffset = ref(0)
    const isScroll = ref(false)
    const writeData = computed(() => store.state.blog.writeData)
    const markdownText = computed(() => writeData.value.content)
    const previewElement = ref<Element>()
    const currentPosition = ref(0)
    // 预览渲染完成后的回调
    const previewAfter = (previewRef: Element) => {
      if (previewElement.value) return
      previewElement.value = previewRef
    }

    // 设置面包屑内容及地址
    const breadcrumbs = ref([
      {
        name: '文章管理',
        path: '/main/blog/write'
      },
      {
        name: '文章预览'
      }
    ])

    // 设置面包屑样式
    const breadcrumbStyle = ref({
      lineHeight: '50px',
      fontSize: '16px'
    })

    window.addEventListener('wheel', () => {
      if (document.documentElement.scrollTop > currentPosition.value) {
        isScroll.value = true
      } else if (document.documentElement.scrollTop < currentPosition.value) {
        isScroll.value = false
      }
      currentPosition.value = document.documentElement.scrollTop
    })
    store.dispatch('blog/writeDataAction', route.params.id)

    return {
      markdownText,
      previewElement,
      headerOffset,
      isScroll,
      breadcrumbs,
      breadcrumbStyle,
      previewAfter
    }
  }
})
</script>

<style scoped lang="less">
.preview-header {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px #333;
  transition: all 0.5s;
  position: sticky;
  top: 0;
  z-index: 999;
}

.isScroll {
  top: -60px;
}
.write-preview-content {
  padding: 20px;
  box-sizing: border-box;

  .preview-content {
    width: 55%;
    margin: 0 auto;
    box-shadow: 0 0 10px #333;
    overflow: hidden;
    border-radius: 10px;
  }
  .preview-outline {
    position: fixed;
    box-shadow: 0 0 10px #333;
    overflow: hidden;
    border-radius: 10px;
  }
}
</style>
