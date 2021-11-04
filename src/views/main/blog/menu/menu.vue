<template>
  <div>
    <content-page :contentConfig="menuContentConfig" pageName="blogMenu"></content-page>
  </div>
</template>

<script lang="ts">
import ContentPage from '@/components/content-page'
import { defineComponent } from 'vue'

import { menuContentConfig } from './config/content.config'
export default defineComponent({
  components: {
    ContentPage
  },
  setup() {
    return {
      menuContentConfig
    }
  }
})
</script>

<style scoped></style>
