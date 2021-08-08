<template>
  <div class="login-phone">
    <el-form :rules="rules" :model="loginPhone">
      <el-form-item label="手机号:" prop="mobileNum">
        <el-input autocomplete="off" v-model="loginPhone.mobileNum"></el-input>
        <div class="login-btn"></div>
      </el-form-item>

      <el-form-item label="验证码:" prop="code">
        <div class="code-content">
          <el-input autocomplete="off" v-model="loginPhone.code"></el-input>
          <el-button class="send-code" type="primary">发送</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const loginPhone = reactive({
      mobileNum: '',
      code: ''
    })
    return {
      loginPhone,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.code-content {
  display: flex;
}
.send-code {
  margin-left: 10px;
}

.el-form-item {
  margin-top: 14px;
}
</style>
