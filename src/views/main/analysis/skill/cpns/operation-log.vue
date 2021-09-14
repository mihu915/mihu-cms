<template>
  <div class="operation-log">
    <mh-card>
      <template #title>
        <div>操作日志：</div>
      </template>
      <template #default>
        <div class="log-content"></div>
      </template>
    </mh-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MhCard from '@/base-ui/mh-card/src/mh-card.vue'

export default defineComponent({
  components: {
    MhCard
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.log-content {
  height: 400px;
}
</style>
