<template>
  <div class="user-info">
    <el-dropdown size="small">
      <div class="user-info-menu">
        <div class="user-icon">
          <el-avatar :shape="shape" :size="size" icon="el-icon-s-custom"></el-avatar>
        </div>
        <div class="username">{{ username }}</div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-warning-outline">退出登录</el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-edit-outline">修改信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-chat-line-round">最新消息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const username = computed(() => store.state.login.userInfo.realname)

    const state = reactive({
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      size: 'small',
      shape: 'circle'
    })
    return {
      username,
      ...state
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  height: 100%;
  cursor: pointer;
  display: flex;
}
.user-info-menu {
  height: 100%;
  display: flex;
  align-items: center;

  .user-icon {
    margin-right: 5px;
  }
  .username {
    font-size: 14px;
    color: #666;
  }
}
</style>
