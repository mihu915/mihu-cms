<template>
  <div class="preview-write">
    <mh-outline :previewElement="previewElement"></mh-outline>
    <div class="preview-content">
      <mh-vditor-preview
        :markdownText="markdownText"
        @previewAfter="previewAfter"
      ></mh-vditor-preview>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import MhVditorPreview from '@/base-ui/mh-vditor-preview'
import MhOutline from '@/base-ui/mh-outline'
export default defineComponent({
  components: { MhVditorPreview, MhOutline },
  setup() {
    const store = useStore()
    const route = useRoute()
    const writeData = computed(() => store.state.blog.writeData)
    const markdownText = computed(() => writeData.value.content)
    const previewElement = ref<Element>()

    // 预览渲染完成后的回调
    const previewAfter = (previewRef: Element) => {
      console.log(previewRef)
      previewElement.value = previewRef
    }

    store.dispatch('blog/writeDataAction', route.params.id)

    return {
      markdownText,
      previewElement,
      previewAfter
    }
  }
})
</script>

<style scoped>
.preview-content {
  width: 55%;
  margin: 0 auto;
}
</style>
