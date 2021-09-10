<template>
  <div class="role">
    <search-page :searchConfig="roleSearchConfig" title="查询角色：" pageName="role"></search-page>
    <content-page
      :contentConfig="roleContentConfig"
      pageName="role"
      title="角色信息："
    ></content-page>
  </div>
</template>

<script lang="ts">
import contentPage from '@/components/content-page/src/content-page.vue'
import SearchPage from '@/components/search-page/src/search-page.vue'

import { defineComponent } from 'vue'

import { roleSearchConfig } from './config/search.config'
import { roleContentConfig } from './config/content.config'

export default defineComponent({
  components: { SearchPage, contentPage },
  setup() {
    return {
      roleSearchConfig,
      roleContentConfig
    }
  }
})
</script>

<style scoped></style>
