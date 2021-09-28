<template>
  <div class="config common-piece">
    <mh-description :descriptionConfig="descriptionConfig" :data="configData"></mh-description>
  </div>
</template>

<script lang="ts">
import mhDescription from '@/base-ui/mh-description'

import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { descriptionConfig } from './config/description.config'

export default defineComponent({
  components: { mhDescription },
  setup() {
    const store = useStore()
    const configData = ref()
    store.dispatch('blog/blogConfigInfoAction').then(() => {
      configData.value = { ...store.state.blog.blogConfig }
    })

    return {
      descriptionConfig,
      configData
    }
  }
})
</script>

<style scoped></style>
