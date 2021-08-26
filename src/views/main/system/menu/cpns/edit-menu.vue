<template>
  <div class="edit-menu">
    <mh-form :formConfig="formConfig" v-model="formData"></mh-form>
  </div>
</template>

<script lang="ts">
import mhForm from '@/base-ui/mh-form/src/mh-form.vue'
import { defineComponent, ref } from 'vue'
import { editMenuConfig } from '../config/form.config'

export default defineComponent({
  components: { mhForm },
  setup() {
    const formConfig = ref(editMenuConfig)
    const formData = {}
    return {
      formConfig,
      formData
    }
  }
})
</script>

<style scoped></style>
