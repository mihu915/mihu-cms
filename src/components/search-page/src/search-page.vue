<template>
  <div class="search-page">
    <mh-form
      :title="title"
      :formConfig="searchConfig"
      v-model="formData"
      leftBtnText="重置"
      rightBtnText="查询"
      @handleLeftBtn="handleResetBtn"
      @handleRightBtn="handleSearchBtn"
    ></mh-form>
  </div>
</template>

<script lang="ts">
import { emitter } from '@/utils'

import mhForm from '@/base-ui/mh-form/src/mh-form.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { mhForm },
  props: {
    title: {
      type: String,
      default: ''
    },
    pageName: {
      type: String,
      required: true
    },
    searchConfig: {
      type: Object
    }
  },
  setup() {
    const formData = ref({})

    // 点击重置按钮
    const handleResetBtn = () => {
      formData.value = {}
      emitter.emit('updateBus')
    }

    // 处理搜索按钮
    const handleSearchBtn = () => {
      emitter.emit('updateBus', {
        ...formData.value
      })
    }

    return {
      formData,
      handleResetBtn,
      handleSearchBtn
    }
  }
})
</script>

<style scoped>
.search-page {
  box-sizing: border-box;
  margin-bottom: 20px;
}

.search-btn {
  width: 100%;
  text-align: right;
}
</style>
