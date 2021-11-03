<template>
  <div class="config common-piece">
    <mh-description
      :descriptionConfig="descriptionConfig"
      :data="configData"
      @handleExtraBtn="handleExtraBtn"
    >
      <template #blogger_avatar>
        <el-avatar :src="configData.blogger_avatar" :size="80" shape="square"></el-avatar>
      </template>
    </mh-description>
    <editor-config-dialog v-model="isShowDialog" :data="configData"></editor-config-dialog>
  </div>
</template>

<script lang="ts">
import mhDescription from '@/base-ui/mh-description'
import EditorConfigDialog from './cpns/editor-infos-dialog.vue'

import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { descriptionConfig } from './config/description.config'

export default defineComponent({
  components: { mhDescription, EditorConfigDialog },
  setup() {
    const store = useStore()
    const configData = computed(() => ({ ...store.state.blog.blogConfig }))
    const isShowDialog = ref(false)

    store.dispatch('blog/blogConfigInfoAction')
    const handleExtraBtn = () => {
      isShowDialog.value = true
    }

    return {
      descriptionConfig,
      configData,
      isShowDialog,
      handleExtraBtn
    }
  }
})
</script>

<style scoped></style>
