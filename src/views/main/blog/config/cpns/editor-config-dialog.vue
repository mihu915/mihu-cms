<template>
  <div class="editor-config-dialog">
    <el-dialog v-model="isShowDialog" title="编辑博客配置信息：" @close="closeDialog">
      <mh-form
        :formConfig="cfFormConfig"
        v-model="formData"
        leftBtnText="取消"
        rightBtnText="保存"
        @handleLeftBtn="handleLeftBtn"
        @handleRightBtn="handleRightBtn"
        :uploadHeader="uploadHeader"
      ></mh-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { cfFormConfig } from './config/form.config'
import { useStore } from '@/store'
import MhForm from '@/base-ui/mh-form'
export default defineComponent({
  components: {
    MhForm
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const store = useStore()
    const isShowDialog = ref(props.modelValue)
    const formData = ref()

    const uploadHeader = ref({ Authorization: 'Bearer ' + store.state.login.token })

    watch(
      () => props.data,
      (newValue) => {
        formData.value = newValue
      }
    )
    watch(
      () => props.modelValue,
      (newValue) => {
        isShowDialog.value = newValue
      }
    )

    const closeDialog = () => {
      emit('update:modelValue', false)
    }

    const handleLeftBtn = () => {
      isShowDialog.value = false
    }

    const handleRightBtn = () => {
      isShowDialog.value = false
      store.dispatch('blog/editorBlogConfigAction', formData.value)
    }

    return {
      closeDialog,
      handleLeftBtn,
      handleRightBtn,
      isShowDialog,
      cfFormConfig,
      formData,
      uploadHeader
    }
  }
})
</script>

<style scoped></style>
