<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div>
      <router-link to="/login">login</router-link>
      <router-link to="/main">main</router-link>
    </div>

    <router-view></router-view>

    <el-button>默认按钮</el-button>
    <el-button type="primary" @click="clickBtn">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    function clickBtn() {
      console.log('hahaha')
    }
    return {
      clickBtn
    }
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
