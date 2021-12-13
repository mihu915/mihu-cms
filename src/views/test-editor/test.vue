<template>
  <div class="test">
    <mh-vditor-preview :markdownText="markdownText"></mh-vditor-preview>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MhVditorPreview from '@/base-ui/mh-vditor/src/mh-vditor-preview.vue'

import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    MhVditorPreview
  },
  setup() {
    const route = useRoute()
    const markdownText = ref()
    markdownText.value = route.params.content
    return {
      markdownText
    }
  }
})
</script>

<style scoped>
.test {
  height: 100%;
  width: 100%;
}
</style>
