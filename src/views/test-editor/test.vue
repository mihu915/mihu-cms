<template>
  <div class="test">
    <mh-vditor-preview></mh-vditor-preview>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MhVditorPreview from '@/base-ui/mh-vditor/src/mh-vditor-preview.vue'
export default defineComponent({
  components: {
    MhVditorPreview
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.test {
  padding-top: 10px;
  height: 100%;
  width: 100%;
}
</style>
