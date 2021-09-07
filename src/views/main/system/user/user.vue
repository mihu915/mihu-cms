<template>
  <div class="user">
    <search-page :searchConfig="roleSearchConfig" title="查询用户："></search-page>
    <content-page :contentConfig="roleContentConfig" pageName="role" title="用户列表：">
    </content-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { roleContentConfig } from './config/content.config'
import { roleSearchConfig } from './config/search.config'

import ContentPage from '@/components/content-page'
import SearchPage from '@/components/search-page'

export default defineComponent({
  components: {
    ContentPage,
    SearchPage
  },
  setup() {
    return {
      roleContentConfig,
      roleSearchConfig
    }
  }
})
</script>

<style scoped></style>
