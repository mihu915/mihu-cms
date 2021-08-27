<template>
  <div class="menu-form">
    <el-dialog
      title="添加菜单"
      destroy-on-close
      v-model="isShowForm"
      width="40%"
      @close="handleClose"
    >
      <div class="dialog-content">
        <mh-form :formConfig="formConfig" v-model="formData" ref="mhFormRef" />
        <div class="menuFormBtn">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="commitAddMenu">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import mhForm from '@/base-ui/mh-form/src/mh-form.vue'
import { defineComponent, ref, watch } from 'vue'
import { editMenuConfig } from '../config/form.config'

export default defineComponent({
  components: { mhForm },
  props: {
    formShow: {
      type: Boolean,
      required: true
    }
  },
  emits: ['closeForm'],
  setup(props, { emit }) {
    const formConfig = ref(editMenuConfig)
    const isShowForm = ref(false)
    const formData: any = ref({
      sort: 0
    })
    const mhFormRef = ref<InstanceType<typeof mhForm>>()

    watch(
      formData,
      (newValue: any) => {
        console.log(newValue)
        formConfig.value.formItemConfig.forEach((item) => {
          if (newValue.type === 2) {
            if (item.field === 'parentMenu') {
              item.isShow = true
            }
          } else {
            if (item.field === 'parentMenu') {
              item.isShow = false
            }
          }
        })
      },
      {
        deep: true
      }
    )

    watch(
      () => props.formShow,
      (newValue) => {
        isShowForm.value = newValue
      }
    )

    const handleClose = () => {
      formData.value = {}
      emit('closeForm')
    }

    const commitAddMenu = () => {
      const valid = mhFormRef.value?.mhFormValid()
      console.log(valid)
      console.log('提交成功')
    }

    return {
      mhFormRef,
      formConfig,
      formData,
      isShowForm,
      handleClose,
      commitAddMenu
    }
  }
})
</script>

<style scoped>
.menuFormBtn {
  padding: 10px 0 0;
  width: auto;
  text-align: right;
}
.dialog-content {
  width: 100%;
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
