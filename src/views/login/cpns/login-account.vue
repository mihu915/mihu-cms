<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account">
      <el-form-item label="账号" prop="username">
        <el-input
          type="username"
          autocomplete="off"
          v-model="account.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          autocomplete="off"
          v-model="account.password"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'




export default defineComponent({
  setup() {
    const account = reactive({
      username: '',
      password: ''
    })

    return {
      account,
      rules
    }
  }
})
</script>

<style scoped></style>
