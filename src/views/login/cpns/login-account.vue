<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号:" prop="username">
        <el-input type="username" autocomplete="off" v-model="account.username"></el-input>
        <div class="login-btn"></div>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type="password" autocomplete="off" v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules, PRIVATEKEY } from '../config/account-config'
import { localCache } from '@/utils'
import { encrypt } from '@/utils'

export default defineComponent({
  setup() {
    // 读取local storage中的密文
    let cipher = localCache.getCache('password')

    let password: string

    const store = useStore()
    // 判断密文有没有值，若有值则解密，没有则初始化
    if (cipher) {
      password = encrypt.decryptHandler(cipher, PRIVATEKEY)
    } else {
      password = ''
    }

    const account = reactive({
      username: localCache.getCache('username'),
      password
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 用户登录
    const userLogin = (isKeepPassword: boolean) => {
      // 如果输入内容验证通过则执行登录操作
      formRef.value?.validate((valid) => {
        if (valid) {
          // 用户派发登录异步事件
          store.dispatch('login/userLoginAction', account)

          // 判断是否为记住密码
          if (isKeepPassword) {
            localCache.setCache('username', account.username)

            // 对密码进行加密，然后存储
            cipher = encrypt.encryptHandler(account.password, PRIVATEKEY)
            localCache.setCache('password', cipher)
          } else {
            // 清除缓存中的账号密码
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      userLogin
    }
  }
})
</script>

<style scoped>
.el-form-item {
  margin-top: 14px;
}
</style>
