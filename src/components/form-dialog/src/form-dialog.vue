<template>
  <div class="form-dialog">
    <el-dialog
      :title="textConfig.dialogTitle"
      :model-value="modelValue"
      @close="closeBox"
      :width="500"
      destroy-on-close
    >
      <div class="dialog-content">
        <mh-form
          :formConfig="formConfig"
          v-model="formData"
          :leftBtnText="textConfig.dialogLeftBtnText"
          :rightBtnText="textConfig.dialogRightBtnText"
          @checkChange="checkChange"
          @handleLeftBtn="closeBox"
          @handleRightBtn="handleRightBtn"
        ></mh-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import MhForm, { IFormConfig } from '@/base-ui/mh-form'

import { defineComponent, PropType, ref, watch } from 'vue'
import { emitter, alterFormConfig, arrayToString } from '@/utils'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    MhForm
  },
  props: {
    dialogFormData: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Boolean
    },
    dialogConfig: {
      type: Object as PropType<IFormConfig>
    },
    pageName: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // 定义标题以及按钮文本信息
    let textConfig = ref({
      dialogTitle: '提示：',
      dialogLeftBtnText: '取消',
      dialogRightBtnText: '确定'
    })

    // 定义双向绑定的form数据
    const formData = ref<any>({})
    const formConfig = ref<any>({ ...props.dialogConfig })
    const store = useStore()

    // 提供设置文本信息的方法
    const setDialogTextInfo = (info: any) => {
      textConfig.value = Object.assign({}, textConfig.value, info)
    }

    // 关闭box，同步box状态，初始化formData
    const closeBox = () => {
      emit('update:modelValue', false)
    }

    // 监听选框变化，将数据转化为字符串并存储到formData
    const checkChange = (data: any) => {
      formData.value.role_menu = arrayToString(data)
    }

    // 监听父组件的formData的变化，将最新值赋值给formData
    watch(
      () => props.dialogFormData,
      (newValue) => {
        formData.value = newValue
      },
      { deep: true }
    )

    // 处理右边按钮点击逻辑
    const handleRightBtn = () => {
      // 判断父组件有没有传值过来，如果有，则说明是编辑，没有则是新建
      if (Object.keys(props.dialogFormData).length) {
        store
          .dispatch('common/alterListDataAction', {
            pageName: props.pageName,
            data: formData.value
          })
          .then(() => {
            emitter.emit('updateBus')
            closeBox()
          })
      } else {
        store
          .dispatch('common/createDataAction', { pageName: props.pageName, data: formData.value })
          .then(() => {
            emitter.emit('updateBus')
            closeBox()
          })
          .catch((err) => {
            return err
          })
      }
    }

    // 监听formData数据变化
    switch (props.pageName) {
      case 'menu':
        watch(
          () => formData.value.type,
          (newValue) => {
            if (newValue === 2) {
              alterFormConfig(formConfig.value, 'parent_id', 'isShow', true)
            } else {
              alterFormConfig(formConfig.value, 'parent_id', 'isShow', false)
            }
          }
        )

        watch(
          () => formData.value.parent_id,
          (newValue) => {
            if (props.dialogFormData.parent_id === newValue) {
              if (props.dialogFormData.url) {
                formData.value.url = props.dialogFormData.url
              }
            } else {
              store.state.entireMenuData.find((item) => {
                if (item.id === newValue) formData.value.url = item.url
              })
            }
          }
        )
        break
    }

    return {
      formData,
      textConfig,
      formConfig,
      closeBox,
      checkChange,
      handleRightBtn,
      setDialogTextInfo
    }
  }
})
</script>

<style scoped>
.dialog-content {
  padding-right: 20px;
}
.dialog-footer {
  width: 100%;
  text-align: right;
}
</style>
