<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from '../login/cpns/login-panel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.login {
  text-align: center;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url('../../assets/img/login-bg.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
}
</style>
