<template>
  <div class="markdown">
    <div class="markdown-header">正在编辑：{{ writeData.title }}</div>
    <mh-vditor
      ref="MhVditorRef"
      @clickSave="handleClickSave"
      @input="handleInput"
      @blur="handleBlur"
      @afterVditor="afterVditor"
    ></mh-vditor>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
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
    const store = useStore()
    const writeData = ref()

    const isContentChange = ref(false)
    const isSave = ref(false)
    const mdContent = ref('')
    const MhVditorRef = ref<InstanceType<typeof MhVditor>>()

    // 判断是否通过正常途径进入该页面，如果不是，则直接跳转至notFound页面
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

    // 处理刷新提示
    window.onbeforeunload = () => {
      return 'result'
    }

    // 编辑器渲染完成后的回调函数
    const afterVditor = () => {
      if (writeData.value.content && writeData.value.content !== 'null') {
        MhVditorRef.value!.vditor?.setValue(writeData.value.content)
      }
      MhVditorRef.value?.vditor?.focus()
    }

    const openBox = () => {
      return ElMessageBox.confirm(
        '当前内容未保存，继续退出将导致已修改的内容丢失，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
    }

    // 监听失去焦点
    const handleBlur = (value: string) => {
      mdContent.value = value
    }

    // 监听输入
    const handleInput = (value: string) => {
      if (!isContentChange.value) isContentChange.value = true
      mdContent.value = value
    }

    // 处理保存按钮的点击
    const handleClickSave = () => {
      console.log('save')
      writeData.value.content = mdContent.value
      store
        .dispatch('common/alterListDataAction', { pageName: 'write', data: writeData.value })
        .then((res) => {
          if (res.code === 200) isSave.value = true
        })
    }

    // 处理变化和保存的状态，根据状态判断是否提示
    const handleChangeSave = async () => {
      let flag = true
      // 判断内容是否有变化，如果有变化，则判断是否保存，如果没保存则弹出提示，其他情况则可直接离开当前页面
      if (isContentChange.value) {
        if (isSave.value) {
          flag = true
        } else {
          flag = await openBox()
            .then(() => {
              localCache.deleteCache('writeData')
              return true
            })
            .catch(() => {
              return false
            })
        }
      } else {
        flag = true
      }
      return flag
    }

    onBeforeRouteLeave(async (to, from) => {
      const result = await handleChangeSave()
      return result
    })

    return {
      writeData,
      MhVditorRef,
      afterVditor,
      handleClickSave,
      handleInput,
      handleBlur
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
