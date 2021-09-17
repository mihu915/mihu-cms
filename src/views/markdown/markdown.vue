<template>
  <div class="markdown">
    <div class="markdown-header">正在编辑：{{ writeData.title }}</div>
    <mh-vditor @clickSave="handleClickSave"></mh-vditor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { localCache } from '@/utils'
import MhVditor from '@/base-ui/mh-vditor'

export default defineComponent({
  components: {
    MhVditor
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const writeData = ref()

    writeData.value = route.params
    if (Object.keys(writeData.value).length) {
      localCache.setCache('writeData', route.params)
    } else {
      writeData.value = localCache.getCache('writeData')
      if (!writeData.value) {
        router.replace({
          name: 'not-found'
        })
      }
    }

    const openBox = () => {
      return ElMessageBox.alert('当前内容未保存，是否继续退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    }

    const handleClickSave = () => {
      console.log('save')
    }
    onBeforeRouteLeave((to, from) => {
      openBox()
        .then(() => {
          localCache.deleteCache('writeData')
          return true
        })
        .catch(() => {
          return false
        })
    })
    return {
      writeData,
      handleClickSave
    }
  }
})
</script>

<style scoped>
.markdown {
  width: 100vw;
  height: 100vh;
  background-color: #1d2125;
  padding: 0 100px;
  box-sizing: border-box;
  overflow-y: scroll;
}

.markdown-header {
  font-size: 16px;
  line-height: 50px;
  color: rgb(192, 192, 192);
}
</style>
