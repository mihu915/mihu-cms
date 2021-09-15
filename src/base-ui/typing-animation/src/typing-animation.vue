<template>
  <div class="typing-animation">
    <span class="typing" ref="typingRef"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Typed from 'typed.js'
export default defineComponent({
  setup() {
    const typingRef = ref<HTMLElement>()
    onMounted(() => {
      const typed = new Typed(typingRef.value!, {
        strings: [
          'PHP是世界上最好的语言?',
          '并不，JavaScript才是！',
          'MHCMS是基于Vue3、Vuex、VueRouter、WebPack、ElementPlus、TypeScript、Echart5等技术的后台系统解决方案。'
        ], //输入内容, 支持html标签
        typeSpeed: 70, //打字速度
        backSpeed: 50 //回退速度
      })
    })
    return {
      typingRef
    }
  }
})
</script>

<style scoped lang="less">
.typing-animation {
  font-size: 16px;
  color: #666;
  margin-left: 20px;
}
</style>
