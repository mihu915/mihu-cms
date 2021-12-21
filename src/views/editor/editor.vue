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

    const MhVditorRef = ref<InstanceType<typeof MhVditor>>()

    // 文章内容
    const mdContent = ref('')

    // 文章标题
    const writeTitle = ref('')

    // 内容是否保存
    const isSave = ref(true)

    // 设置面包屑内容及地址
    const breadcrumbs = computed(() => {
      return [
        {
          name: '文章管理',
          path: '/main/blog/write'
        },
        {
          name: writeTitle.value
        }
      ]
    })

    const saveWriteContent = (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        console.log(MhVditorRef.value?.vditor?.getValue())
        store
          .dispatch('blog/updateWriteContentAction', {
            id: route.params.id,
            content: mdContent.value
          })
          .then(() => {
            isSave.value = true
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    }

    // 设置面包屑样式
    const breadcrumbStyle = ref({
      lineHeight: '50px',
      color: 'rgb(192, 192, 192)'
    })

    // 处理刷新提示
    // window.onbeforeunload = async () => {
    //   return 'result'
    // }

    // 编辑器渲染完成后的回调函数
    const afterVditor = () => {
      store.dispatch('blog/writeDataAction', route.params.id).then((res) => {
        if (res.data.content && res.data.content !== 'null') {
          // 判断是否有内容，并将内容渲染出来
          MhVditorRef.value!.vditor?.setValue(res.data.content)
          mdContent.value = res.data.content
          writeTitle.value = res.data.title
        }
        // 自动光标
        MhVditorRef.value?.vditor?.focus()
      })
    }

    // 监听失去焦点
    const handleBlur = () => {
      if (!isSave.value) {
        saveWriteContent()
      }
    }

    // 处理保存按钮的点击
    const handleClickSave = () => {
      handleBlur()
    }

    // 监听输入
    const handleInput = (value: string) => {
      // 状态改为已修改
      mdContent.value = value
      isSave.value = false
    }

    // 跳转路由之前的钩子
    onBeforeRouteLeave(async () => {
      if (isSave.value) return true
      else {
        return await saveWriteContent()
      }
    })

    return {
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
