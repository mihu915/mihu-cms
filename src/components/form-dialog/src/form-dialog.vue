<template>
  <div class="form-dialog">
    <el-dialog :title="title" v-model="isOpenBox" @close="closeBox" destroy-on-close>
      <div class="dialog-content">
        <mh-form
          :formConfig="formConfig"
          v-model="formData"
          ref="mhDialogRef"
          @handleLeftBtn="closeBox"
          @handleRightBtn="handleDataBtn"
          leftBtnText="取消"
          :rightBtnText="rightBtnText"
        ></mh-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, PropType } from 'vue'
import { useStore } from '@/store'
import { getParentMenuInfo } from '@/utils'
import { getArrayIndex } from '@/utils'

import MhForm from '@/base-ui/mh-form'
export default defineComponent({
  components: {
    MhForm
  },
  props: {
    type: {
      type: String as PropType<'new' | 'edit'>,
      required: true
    },
    editData: {
      type: Object
    },
    title: {
      type: String
    },
    modelValue: {
      type: Boolean
    },
    dialogConfig: {
      type: Object
    },
    pageName: {
      type: String
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // 判断如果没有传dialogConfig则不执行以下操作
    if (!props.dialogConfig) return

    const store = useStore()
    const isOpenBox = ref(false)
    const formData = ref({})
    const mhDialogRef = ref<InstanceType<typeof MhForm>>()
    const formConfig: any = ref(props.dialogConfig)
    const rightBtnText = ref('')

    const menuList = computed(() => store.state.system.menuListData)
    const menuIndex = getArrayIndex(formConfig.value.formItemConfig, 'field', 'parent_id')

    // 监听box的状态
    watch(
      () => props.modelValue,
      (newValue) => {
        isOpenBox.value = newValue
        if (props.type === 'edit') {
          rightBtnText.value = '保存'
          formData.value = { ...props.editData }
        } else {
          rightBtnText.value = '创建'
          formData.value = {}
        }
      }
    )

    // 监听formData的改变
    watch(
      formData,
      (newValue: any) => {
        switch (props.pageName) {
          case 'menu':
            if (newValue.type === 2) {
              const parentMenus = getParentMenuInfo(menuList.value)
              formConfig.value.formItemConfig[menuIndex!].options = parentMenus
              formConfig.value.formItemConfig[menuIndex!].isShow = true
              if (props.type === 'edit' && props.editData?.type === 1) {
                for (let i = 0; i < parentMenus.length; i++) {
                  if (parentMenus[i].label === props.editData?.id) {
                    parentMenus.splice(i, 1)
                  }
                }
              }
            } else {
              formConfig.value.formItemConfig[menuIndex!].isShow = false
            }
            break
        }
      },
      {
        deep: true
      }
    )

    // 同步box状态
    const closeBox = () => {
      isOpenBox.value = false
      formData.value = {}
      emit('update:modelValue', isOpenBox.value)
    }

    // 点击右边按钮事件
    const handleDataBtn = () => {
      const valid = mhDialogRef.value?.mhFormValid()
      if (valid) {
        switch (props.type) {
          case 'new':
            store.dispatch('system/createData', { pageName: props.pageName, data: formData.value })
            break
          case 'edit':
            store.dispatch('system/alterListData', {
              pageName: props.pageName,
              data: formData.value
            })
            break
        }
      }

      closeBox()
    }

    return {
      isOpenBox,
      formData,
      mhDialogRef,
      formConfig,
      closeBox,
      handleDataBtn,
      rightBtnText
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
