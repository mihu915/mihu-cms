<template>
  <div class="mh-form">
    <el-form>
      <template v-for="item of formConfig.itemAttributes" :key="item.label">
        <template v-if="item.itemType === 'input'">
          <el-form-item :label="item.label">
            <el-input></el-input>
          </el-form-item>
        </template>

        <template v-if="item.itemType === 'select'">
          <el-form-item :label="item.label">
            <el-select model-value="123">
              <el-option
                v-for="option of item.selectOptionItem"
                :key="option.label"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IFormConfig } from '@/base-ui/mh-form'
export default defineComponent({
  props: {
    formConfig: {
      type: Object as PropType<IFormConfig>,
      default: () => ({})
    }
  },
  setup() {
    const region = ref('')
    return {
      region
    }
  }
})
</script>

<style scoped></style>
