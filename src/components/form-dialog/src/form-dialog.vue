<template>
  <div class="form-dialog">
    <el-dialog :title="title" v-model="isOpenBox" @close="closeBox" destroy-on-close>
      <div class="dialog-content">
        <mh-form :formConfig="formConfig" v-model="formData" ref="mhDialogRef"></mh-form>
        <div class="dialog-footer">
          <el-button @click="closeBox">取消</el-button>
          <el-button type="primary" @click="handleDataBtn">{{
            type === 'new' ? '创建' : '保存'
          }}</el-button>
        </div>
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
import { system } from '@/store/main/system/system'
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
    const store = useStore()
    const isOpenBox = ref(false)
    const formData = ref({})
    const mhDialogRef = ref<InstanceType<typeof MhForm>>()
    const formConfig: any = ref(props.dialogConfig)
    const menuList = computed(() => store.state.system.menuListData)
    const menuIndex = getArrayIndex(formConfig.value.formItemConfig, 'field', 'parent_id')

    // 监听box的状态
    watch(
      () => props.modelValue,
      (newValue) => {
        isOpenBox.value = newValue
      }
    )

    // 监听编辑数据是否传入
    watch(
      () => props.editData,
      (newValue: any) => {
        delete newValue.created
        delete newValue.updated
        formData.value = newValue
      }
    )

    // 监听formData的改变
    watch(
      formData,
      (newValue: any) => {
        console.log(newValue)
        switch (props.pageName) {
          case 'menu':
            if (newValue.type === 2) {
              const parentMenus = getParentMenuInfo(menuList.value)
              console.log(parentMenus)
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

    // 点击新建按钮事件
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
      handleDataBtn
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
