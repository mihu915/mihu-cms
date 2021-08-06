<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <template #label :stretch="true">
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account></login-account>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 30%;
}
</style>
