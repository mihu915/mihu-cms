<template>
  <div class="project-structure">
    <mh-card>
      <template #title> 项目目录结构： </template>
      <template #default>
        <pre class="fileTree">
          <code>
            {{skillConfig.fileTree}}
          </code>
        </pre>
      </template>
    </mh-card>
  </div>
</template>

<script lang="ts">
import mhCard from '@/base-ui/mh-card/src/mh-card.vue'
import { defineComponent } from 'vue'
import * as skillConfig from '../config'

export default defineComponent({
  components: { mhCard },
  setup() {
    return {
      skillConfig
    }
  }
})
</script>

<style scoped>
.fileTree {
  padding: 0;
  margin: 0;
  color: #555;
  overflow-x: scroll;
}
</style>
