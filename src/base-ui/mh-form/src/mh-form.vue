<template>
  <div class="mh-form">
    <el-form :label-width="formConfig.labelWidth">
      <el-row :gutter="formConfig.gutter">
        <template v-for="(item, index) of formConfig.formItemConfig" :key="index">
          <el-col
            :span="item.colLayout?.span"
            :xs="item.colLayout?.xs || 24"
            :sm="item.colLayout?.sm || 24"
            :md="item.colLayout?.md || 12"
            :lg="item.colLayout?.lg || 8"
            :xl="item.colLayout?.xl || 6"
          >
            <el-form-item class="form-item" :label="item.label" :style="formConfig.itemLayout">
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
                  <template v-for="(option, index) of item.option" :key="index">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>

              <template v-else-if="item.type === 'datePicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :v-model="formData[`${item.field}`]"
                ></el-date-picker>
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
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        console.log(newValue)
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped>
.form-item {
  padding: 0;
  margin: 0;
}
</style>
