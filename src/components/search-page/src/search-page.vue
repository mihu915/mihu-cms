<template>
  <div class="search-page">
    <div class="search-header">{{ title }}</div>
    <mh-form :formConfig="searchConfig"></mh-form>
    <div class="search-footer">
      <div class="search-btn">
        <el-button>重置</el-button>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import mhForm from '@/base-ui/mh-form/src/mh-form.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { mhForm },
  props: {
    title: {
      type: String,
      default: ''
    },
    searchConfig: {
      type: Object
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.search-page {
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
}
.search-header {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 24px;
}
.search-footer {
  margin-top: 20px;
  display: flex;
  width: 100%;
}
.search-btn {
  width: 100%;
  text-align: right;
}
</style>
