<template>
  <div class="mh-editor">
    <v-md-editor class="editor-content" v-model="markdownText" height="400px"></v-md-editor>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    mdText: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const markdownText = ref(props.mdText)
    return {
      markdownText
    }
  }
})
</script>

<style scoped>
.editor-content {
  background-color: #333;
}
</style>
