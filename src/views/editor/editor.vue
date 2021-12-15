<template>
  <div class="editor">
    <div class="markdown-header">
      <mh-breadcrumb :breadcrumbs="breadcrumbs" :style="breadcrumbStyle"></mh-breadcrumb>
      <el-button size="mini" :style="{ height: '35px' }" type="primary">发布文章</el-button>
    </div>
    <div class="editor-content">
      <mh-vditor
        ref="MhVditorRef"
        :uploadUrl="uploadUrl"
        @clickSave="handleClickSave"
        @input="handleInput"
        @blur="handleBlur"
        @afterVditor="afterVditor"
      ></mh-vditor>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { ElMessageBox } from 'element-plus'
import { localCache } from '@/utils'
import { BASE_URL } from '@/service/request/config'
import MhVditor from '@/base-ui/mh-vditor'
import MhBreadcrumb from '@/base-ui/mh-breadcrumb'

export default defineComponent({
  components: {
    MhVditor,
    MhBreadcrumb
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const uploadUrl = ref(BASE_URL + '/files/screenshot')

    // 内容是否发生变化
    const isContentChange = ref(false)

    // 内容是否保存
    const isSave = ref(false)

    const mdContent = ref('')

    const MhVditorRef = ref<InstanceType<typeof MhVditor>>()

    store.dispatch('blog/writeDataAction', route.params.id)

    const writeData = computed(() => store.state.blog.writeData)

    // 设置面包屑内容及地址
    const breadcrumbs = computed(() => {
      return [
        {
          name: '文章管理',
          path: '/main/blog/write'
        },
        {
          name: writeData.value.title
        }
      ]
    })

    // 设置面包屑样式
    const breadcrumbStyle = ref({
      lineHeight: '50px',
      color: 'rgb(192, 192, 192)'
    })

    // 处理刷新提示
    window.onbeforeunload = () => {
      return 'result'
    }

    // 编辑器渲染完成后的回调函数
    const afterVditor = () => {
      if (writeData.value.content && writeData.value.content !== 'null') {
        // 判断是否有内容，并将内容渲染出来
        MhVditorRef.value!.vditor?.setValue(writeData.value.content)
      }
      // 自动光标
      MhVditorRef.value?.vditor?.focus()
    }

    const openBox = () => {
      return ElMessageBox.confirm('当前内容未保存，是否保存当前内容并退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
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
      writeData.value.content = mdContent.value
      store
        .dispatch('common/alterListDataAction', {
          pageName: 'write',
          prefix: '',
          data: writeData.value
        })
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
              handleClickSave()
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

    onBeforeRouteLeave(async () => {
      const result = await handleChangeSave()
      return result
    })

    return {
      writeData,
      mdContent,
      MhVditorRef,
      breadcrumbs,
      breadcrumbStyle,
      uploadUrl,
      afterVditor,
      handleClickSave,
      handleInput,
      handleBlur
    }
  }
})
</script>

<style scoped>
.editor {
  width: 100vw;
  height: 100vh;
  background-color: #1d2125;
  box-sizing: border-box;
  overflow-y: scroll;
}
.markdown-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #1d2125;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 10px 100px;
  align-items: center;
}
.editor-content {
  position: relative;
  padding: 0 100px;
}
</style>
