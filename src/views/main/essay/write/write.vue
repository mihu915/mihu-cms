<template>
  <div class="write">
    <mh-vditor></mh-vditor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MhVditor from '@/base-ui/mh-vditor'
export default defineComponent({
  components: {
    MhVditor
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
