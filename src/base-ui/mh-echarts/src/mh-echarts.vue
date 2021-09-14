<template>
  <div class="mh-echarts">
    <div class="echarts-content" ref="echartsRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const echartsRef = ref<HTMLElement>()

    onMounted(() => {
      const { setOptions } = useEchart(echartsRef.value!)
      watchEffect(() => {
        setOptions(props.options)
      })
    })
    return {
      echartsRef
    }
  }
})
</script>

<style scoped>
div {
  color: rgb(255, 238, 214);
}
</style>
