<template>
  <div class="mh-form">
    <div class="form-header" v-if="title">{{ title }}</div>

    <el-form :label-width="formConfig.labelWidth" :model="modelValue" ref="formRef">
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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeUpdate($event, item.field)"
                ></el-input>
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeUpdate($event, item.field)"
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
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeUpdate($event, item.field)"
                ></el-date-picker>
              </template>

              <template v-else-if="item.type === 'radioGroup'">
                <el-radio-group
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeUpdate($event, item.field)"
                >
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

              <template v-else-if="item.type === 'tree'">
                <el-tree v-bind="item.treeOption" @checkChange="checkChange" @nodeClick="nodeClick">
                </el-tree>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="form-footer">
      <div class="form-footer-btn">
        <el-button @click="handleLeftBtn">{{ leftBtnText }}</el-button>
        <el-button @click="handleRightBtn" type="primary">{{ rightBtnText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IFormConfig } from '@/base-ui/mh-form'
import { ElForm } from 'element-plus'

export default defineComponent({
  props: {
    leftBtnText: {
      type: String
    },
    rightBtnText: {
      type: String
    },
    title: {
      type: String
    },

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
  emits: ['update:modelValue', 'handleLeftBtn', 'handleRightBtn'],

  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const changeUpdate = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    const checkMenuId: any[] = []

    const mhFormValid = () => {
      let flag: any = false
      formRef.value?.validate((valid) => {
        flag = valid
      })
      return flag
    }

    const handleLeftBtn = () => {
      emit('handleLeftBtn')
    }
    const handleRightBtn = () => {
      emit('handleRightBtn')
    }
    const nodeClick = () => {
      console.log('123')
    }
    const checkChange = (data: any, self: any) => {
      console.log(data)
      console.log(self)
      // console.log(child)
      if (self) {
        checkMenuId.push(data.id)
      }
      console.log(checkMenuId)
    }
    return {
      formRef,
      nodeClick,
      changeUpdate,
      mhFormValid,
      checkChange,
      handleLeftBtn,
      handleRightBtn
    }
  }
})
</script>

<style scoped lang="less">
.form-item {
  padding: 0;
  margin: 0;
}
.form-header {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 24px;
}
.form-footer {
  display: flex;
  width: 100%;
  .form-footer-btn {
    text-align: right;
    width: 100%;
  }
}
</style>
