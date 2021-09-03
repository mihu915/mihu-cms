<template>
  <div class="role">
    <content-page :contentConfig="contentConfig" pageName="role"></content-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentPage from '@/components/content-page'
import { contentConfig } from './config/content.config'
export default defineComponent({
  components: {
    ContentPage
  },
  setup() {
    return {
      contentConfig
    }
  }
})
</script>

<style scoped></style>
