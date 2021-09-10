<template>
  <div class="form-dialog">
    <el-dialog
      :title="title"
      :model-value="modelValue"
      @close="closeBox"
      @open="openBox"
      :width="dialogWidth"
      destroy-on-close
    >
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
import { getParentMenuInfo, getConfigItemIndex, handleRoleOptions } from '@/utils'

import MhForm from '@/base-ui/mh-form'
export default defineComponent({
  components: {
    MhForm
  },
  props: {
    dialogWidth: {
      type: Number
    },
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

  emits: ['update:modelValue', 'listDataUpdate'],

  setup(props, { emit }) {
    // 判断如果没有传dialogConfig则不执行以下操作
    if (!props.dialogConfig) return

    const store = useStore()
    const formData: any = ref({})
    const mhDialogRef = ref<InstanceType<typeof MhForm>>()
    const formConfig: any = ref(props.dialogConfig)
    const rightBtnText = ref('')

    const menuList = computed(() => [...store.state.common.menuListData.list])
    const allRoleList = computed(() => [...store.state.common.roleListData.list])

    let formItemConfigIndex: any

    //  打开box的回调
    const openBox = () => {
      switch (props.type) {
        case 'edit':
          rightBtnText.value = '保存'
          formData.value = { ...props.editData }
          break
        case 'new':
          rightBtnText.value = '创建'
          formData.value = {}
          break
      }

      switch (props.pageName) {
        case 'menu':
          formItemConfigIndex = getConfigItemIndex(
            formConfig.value.formItemConfig,
            'field',
            'parent_id'
          )

          // 监听parentId的变化，自动输入url输入框
          watch(
            () => formData.value.parent_id,
            (newValue) => {
              menuList.value.forEach((parentMenu) => {
                if (parentMenu.id === newValue) {
                  formData.value.url = parentMenu.url
                }

                if (props.type === 'edit' && newValue === props.editData?.parent_id) {
                  formData.value.url = props.editData?.url
                }
              })
            }
          )
          break
        case 'user':
          store.dispatch('common/pageListDataAction', { pageName: 'role' }).then((res) => {
            if (res === 200) {
              const roleOptions = handleRoleOptions(allRoleList.value)
              formItemConfigIndex = getConfigItemIndex(
                formConfig.value.formItemConfig,
                'field',
                'role_id'
              )
              formConfig.value.formItemConfig[formItemConfigIndex].options = roleOptions
            }
          })

          formItemConfigIndex = getConfigItemIndex(
            formConfig.value.formItemConfig,
            'field',
            'password'
          )

          if (props.type === 'edit') {
            formConfig.value.formItemConfig[formItemConfigIndex].isShow = false
          } else {
            formConfig.value.formItemConfig[formItemConfigIndex].isShow = true
          }

          break
        case 'role':
          break
      }
    }

    // 关闭box，同步box状态，初始化formData
    const closeBox = () => {
      emit('update:modelValue', false)
      formData.value = {}
    }

    // 监听formData数据变化
    watch(
      formData,
      (newValue: any) => {
        switch (props.pageName) {
          case 'menu':
            if (newValue.type === 2) {
              const parentMenus = getParentMenuInfo(menuList.value)

              formConfig.value.formItemConfig[formItemConfigIndex].options = parentMenus
              formConfig.value.formItemConfig[formItemConfigIndex].isShow = true

              if (props.type === 'edit' && props.editData?.type === 1) {
                for (let i = 0; i < parentMenus.length; i++) {
                  if (parentMenus[i].label === props.editData?.id) {
                    parentMenus.splice(i, 1)
                  }
                }
              }
            } else {
              formConfig.value.formItemConfig[formItemConfigIndex].isShow = false
            }
            break
          case 'user':
            break
        }
      },
      {
        deep: true
      }
    )

    // 点击右边按钮事件
    const handleDataBtn = () => {
      const valid = mhDialogRef.value?.mhFormValid()
      if (valid) {
        switch (props.type) {
          case 'new':
            store
              .dispatch('common/createData', {
                pageName: props.pageName,
                data: formData.value
              })
              .then((res) => {
                emit('listDataUpdate')
                if (res === 200) closeBox()
              })
              .catch((err) => {
                return err
              })
            break
          case 'edit':
            store
              .dispatch('common/alterListData', {
                pageName: props.pageName,
                data: formData.value
              })
              .then((res) => {
                emit('listDataUpdate')
                if (res === 200) closeBox()
              })
              .catch((err) => {
                return err
              })
            break
        }
      }
    }

    return {
      openBox,
      closeBox,
      formData,
      mhDialogRef,
      formConfig,
      rightBtnText,
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
