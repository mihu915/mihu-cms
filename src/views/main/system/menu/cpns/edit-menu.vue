<template>
  <div class="edit-menu">
    <mh-form :formConfig="formConfig"></mh-form>
  </div>
</template>

<script lang="ts">
import mhForm from '@/base-ui/mh-form/src/mh-form.vue'
import { defineComponent, ref } from 'vue'
import { IFormConfig } from '@/base-ui/mh-form'

export default defineComponent({
  components: { mhForm },
  setup() {
    const formConfig = ref<IFormConfig>({
      itemAttributes: [
        { label: '菜单1', itemType: 'input' },
        {
          label: '菜单2',
          itemType: 'select',
          selectOptionItem: [{ label: '111', value: 'test1' }]
        },
        { label: '菜单3', itemType: 'input' },
        { label: '菜单4', itemType: 'input' }
      ]
    })
    return {
      formConfig
    }
  }
})
</script>

<style scoped></style>
