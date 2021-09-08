<template>
  <div class="user">
    <search-page :searchConfig="userSearchConfig" title="查询用户："></search-page>
    <content-page
      :contentConfig="userContentConfig"
      :dialogConfig="userDialogConfig"
      :dialogWidth="500"
      pageName="user"
      title="用户列表："
    >
    </content-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { userContentConfig } from './config/content.config'
import { userSearchConfig } from './config/search.config'
import { userDialogConfig } from './config/dialog.config'

import ContentPage from '@/components/content-page'
import SearchPage from '@/components/search-page'

export default defineComponent({
  components: {
    ContentPage,
    SearchPage
  },
  setup() {
    return {
      userContentConfig,
      userSearchConfig,
      userDialogConfig
    }
  }
})
</script>

<style scoped></style>
