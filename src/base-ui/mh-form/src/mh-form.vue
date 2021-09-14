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
                  clearable
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
                  value-format="x"
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
                <el-tree v-bind="item.treeOption" @checkChange="checkChange" ref="treeRef">
                </el-tree>
              </template>

              <template v-else-if="item.type === 'avatar'">
                <el-upload
                  class="avatar-uploader"
                  :action="item.avatarOption.action"
                  :limit="item.avatarOption.limit"
                  :multiple="false"
                  :show-file-list="false"
                  :name="item.avatarOption.name"
                  :on-error="uploadError"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="modelValue[`${item.field}`]"
                    :src="modelValue[`${item.field}`]"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import { ElForm, ElTree } from 'element-plus'

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
  emits: [
    'update:modelValue',
    'handleLeftBtn',
    'handleRightBtn',
    'checkChange',
    'handleAvatarSuccess',
    'beforeAvatarUpload',
    'uploadError'
  ],

  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>()

    const changeUpdate = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    const treeRef = ref<InstanceType<typeof ElTree>>()

    const mhFormValid = () => {
      let flag: any = false
      formRef.value?.validate((valid) => {
        flag = valid
      })
      return flag
    }

    // 左按钮被点击
    const handleLeftBtn = () => {
      emit('handleLeftBtn')
    }
    // 右按钮被点击
    const handleRightBtn = () => {
      emit('handleRightBtn')
    }

    // 上传失败调用该方法
    const uploadError = () => {
      emit('uploadError')
    }
    // 文件上传成功的钩子
    const handleAvatarSuccess = (res: any, file: any, fileList: any) => {
      console.log(fileList)
      emit('handleAvatarSuccess', res, file, fileList)
    }

    // 文件上传之前的钩子
    const beforeAvatarUpload = () => {
      emit('beforeAvatarUpload')
    }
    let checkId: any = []

    // 复选框发生改变则提交事件
    const checkChange = () => {
      const chooseCheck = treeRef.value?.getCheckedKeys(false)
      const leaf: any = treeRef.value?.getHalfCheckedKeys()
      checkId = chooseCheck?.concat(leaf)
      emit('checkChange', checkId)
    }

    return {
      formRef,
      treeRef,
      changeUpdate,
      mhFormValid,
      checkChange,
      handleLeftBtn,
      handleRightBtn,
      handleAvatarSuccess,
      beforeAvatarUpload,
      uploadError
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

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar,
.avatar-uploader {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
