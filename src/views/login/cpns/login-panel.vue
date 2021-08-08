<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" :stretch="true">
      <el-tab-pane>
        <template #label :stretch="true">
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="loginAccountRef"></login-account>
      </el-tab-pane>

      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="login-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="changeLoginClick"
      >登录</el-button
    >
    <main></main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()

    const changeLoginClick = () => {
      loginAccountRef.value?.userLogin(isKeepPassword.value)
    }

    return {
      isKeepPassword,
      loginAccountRef,

      changeLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 360px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
}
.login-control {
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
}
.login-button {
  width: 100%;
}
</style>
