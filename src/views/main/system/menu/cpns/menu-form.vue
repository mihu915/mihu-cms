<template>
  <div class="menu-form">
    <el-dialog
      title="添加菜单"
      destroy-on-close
      :model-value="formShow"
      width="40%"
      @close="handleClose"
    >
      <div class="dialog-content">
        <mh-form :formConfig="formConfig" v-model="formData" ref="mhFormRef" />
        <div class="menuFormBtn">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleCommitBtn">{{ btnMessage }}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import mhForm from '@/base-ui/mh-form/src/mh-form.vue'
import { defineComponent, ref, watch, PropType } from 'vue'
import { editMenuConfig } from '../config/form.config'

import { useStore } from '@/store'

import { getParentMenuInfo } from '@/utils'
export default defineComponent({
  components: { mhForm },
  props: {
    formShow: {
      type: Boolean,
      required: true
    },
    openFormType: {
      type: String as PropType<'new' | 'edit'>,
      required: true
    },
    currentMenuData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['closeForm'],
  setup(props, { emit }) {
    const store = useStore()
    const formConfig = ref(editMenuConfig)
    const formData: any = ref({})
    const btnMessage = ref('')
    const mhFormRef = ref<InstanceType<typeof mhForm>>()
    const userMenus = store.state.login.userMenus
    const parentIdIndex = getFormItemConfigIndex('parent_id')

    watch(
      () => props.formShow,
      (newValue) => {
        if (props.openFormType === 'new' && newValue) {
          formConfig.value.formItemConfig[parentIdIndex].options = getParentMenuInfo(userMenus)
          btnMessage.value = '新建'
        } else if (props.openFormType === 'edit' && newValue) {
          formConfig.value.formItemConfig[parentIdIndex].options = getParentMenuInfo(
            userMenus,
            props.currentMenuData.id
          )

          btnMessage.value = '保存'
          console.log(props.currentMenuData)
          formData.value = props.currentMenuData
        }
      }
    )

    // 获取指定配置的索引
    function getFormItemConfigIndex(field: string): number {
      let index = 0
      for (let i in formConfig.value.formItemConfig) {
        if (formConfig.value.formItemConfig[i].field === field) {
          index = parseInt(i)
        }
      }
      return index
    }

    watch(
      formData,
      (newValue: any) => {
        if (newValue.type === 2) {
          formConfig.value.formItemConfig[parentIdIndex].isShow = true
        } else {
          formConfig.value.formItemConfig[parentIdIndex].isShow = false
        }
      },
      {
        deep: true
      }
    )

    const handleClose = () => {
      formData.value = {}
      emit('closeForm')
    }

    const handleCommitBtn = () => {
      const valid = mhFormRef.value?.mhFormValid()
      if (valid) {
        console.log('提交成功')
        if (props.openFormType === 'new') {
          store.dispatch('system/createMenu', formData.value)
        } else if (props.openFormType === 'edit') {
          console.log(formData.value)
        }

        handleClose()
      }
    }

    return {
      mhFormRef,
      formConfig,
      formData,
      handleClose,
      handleCommitBtn,
      btnMessage
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
