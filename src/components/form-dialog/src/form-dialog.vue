<template>
  <div class="form-dialog">
    <el-dialog :title="title" v-model="isOpenBox" @close="closeBox" destroy-on-close>
      <div class="dialog-content">
        <mh-form :formConfig="dialogConfig" v-model="formData" ref="mhDialogRef"></mh-form>
        <div class="dialog-footer">
          <el-button @click="closeBox">取消</el-button>
          <el-button type="primary" @click="createData">新建</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import MhForm from '@/base-ui/mh-form'
export default defineComponent({
  components: {
    MhForm
  },
  props: {
    title: {
      type: String
    },
    modelValue: {
      type: Boolean
    },
    dialogConfig: {
      type: Object
    }
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isOpenBox = ref(false)
    const formData = ref({})
    const mhDialogRef = ref<InstanceType<typeof MhForm>>()

    watch(
      () => props.modelValue,
      (newValue) => {
        isOpenBox.value = newValue
      }
    )
    const closeBox = () => {
      isOpenBox.value = false
      formData.value = {}
      emit('update:modelValue', isOpenBox.value)
    }

    const createData = () => {
      const valid = mhDialogRef.value?.mhFormValid()
      console.log(valid)
      if (valid) {
        console.log(formData)
      }
    }

    return {
      isOpenBox,
      formData,
      mhDialogRef,
      closeBox,
      createData
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
