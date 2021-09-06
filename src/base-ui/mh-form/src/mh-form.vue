<template>
  <div class="mh-form">
    <el-form :label-width="formConfig.labelWidth" :model="formData" ref="formRef">
      <el-row :gutter="formConfig.gutter">
        <template v-for="(item, index) of formConfig.formItemConfig" :key="index">
          <el-col
            :span="formConfig.colLayout?.span || 24"
            :xs="formConfig.colLayout?.xs"
            :sm="formConfig.colLayout?.sm"
            :md="formConfig.colLayout?.md"
            :lg="formConfig.colLayout?.lg"
            :xl="formConfig.colLayout?.xl"
          >
            <el-form-item
              class="form-item"
              :label="item.label"
              :style="formConfig.itemLayout"
              :rules="item.rules"
              :prop="item.field"
              v-if="item.isShow === undefined || item.isShow === true"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :type="item.type === 'input' ? 'text' : 'password'"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-model="formData[`${item.field}`]"
                >
                  <template v-for="(option, index) of item.options" :key="index">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>

              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOption"
                  :v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>

              <template v-else-if="item.type === 'radioGroup'">
                <el-radio-group v-model="formData[`${item.field}`]">
                  <el-radio
                    :style="item.otherOption?.radioStyle"
                    v-bind="item.otherOption"
                    v-for="(option, index) of item.options"
                    :key="index"
                    :label="option?.label"
                    >{{ option?.value }}
                  </el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormConfig } from '@/base-ui/mh-form'
import { ElForm } from 'element-plus'

export default defineComponent({
  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: Object,
      required: true
    },

    formConfig: {
      type: Object as PropType<IFormConfig>,
      default: () => ({
        gutter: 0
      })
    }
  },

  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const formData = ref({ ...props.modelValue })

    const mhFormValid = () => {
      let flag: any = false
      formRef.value?.validate((valid) => {
        flag = valid
      })
      return flag
    }

    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData,
      formRef,
      mhFormValid
    }
  }
})
</script>

<style scoped lang="less">
.form-item {
  padding: 0;
  margin: 0;
}
</style>
