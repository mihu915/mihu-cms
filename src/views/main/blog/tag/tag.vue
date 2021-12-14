<template>
  <div class="write-tag common-piece">
    <div class="tag-content">
      <div class="page-header">文章标签：</div>
      <div class="tag">
        <el-tag
          :key="item.id"
          v-for="item in tagData.list"
          effect="dark"
          closable
          :disable-transitions="false"
          @close="handleClose(item)"
        >
          {{ item.tag_name }}
        </el-tag>
        <div class="tag-input" v-if="inputVisible">
          <el-input
            class="input-new-tag"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter="saveTagInput?.blur()"
            @blur="handleInputConfirm"
          >
          </el-input>
        </div>

        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ 添加标签</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessageBox, ElInput } from 'element-plus'

import { computed, defineComponent, nextTick, ref } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const inputValue = ref('')
    const inputVisible = ref(false)
    const saveTagInput = ref<InstanceType<typeof ElInput>>()
    const tagData = computed(() => store.state.blog.writeTagData)

    // 请求标签数据
    store.dispatch('blog/writeTagDataAction')

    const openBox = (id: number) => {
      ElMessageBox.confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('blog/deleteWriteTag', id)
      })
    }

    // 添加标签打开输入框
    const showInput = () => {
      inputVisible.value = true
      nextTick(() => {
        saveTagInput.value?.focus()
      })
    }

    const handleClose = (tag: any) => {
      openBox(tag.id)
    }

    const handleInputConfirm = () => {
      inputVisible.value = false
      store.dispatch('blog/addWriteTagAction', { tag_name: inputValue.value })
      inputValue.value = ''
    }

    return {
      tagData,
      inputVisible,
      inputValue,
      saveTagInput,
      showInput,
      handleClose,
      handleInputConfirm
    }
  }
})
</script>

<style scoped lang="less">
.write-tag {
  height: calc(100vh - 100px);

  .tag-content {
    height: 100%;
    overflow-y: scroll;
    .page-header {
      font-weight: bold;
      font-size: 24px;
      align-items: center;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .tag {
      .el-tag {
        margin: 0 10px 10px 0;
      }
      .tag-input {
        display: inline-block;
        width: 120px;
      }
    }
  }
}
</style>
