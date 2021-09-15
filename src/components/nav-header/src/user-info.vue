<template>
  <div class="user-info">
    <el-dropdown size="small">
      <div class="user-info-menu">
        <div class="user-icon">
          <el-avatar
            :shape="shape"
            :size="size"
            :icon="userInfo.avatar || 'el-icon-s-custom'"
            :src="userInfo.avatar"
          ></el-avatar>
        </div>
        <div class="username">{{ userInfo.nickname }}</div>
      </div>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-warning-outline" @click="handleQuitLogin">
            退出登录
          </el-dropdown-item>
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
import { localCache } from '@/utils'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const userInfo = computed(() => store.state.login.userInfo)

    // 退出登录操作
    const handleQuitLogin = () => {
      // 删除token，返回至login
      localCache.deleteCache('token')
      router.replace('/login')
    }

    const state = reactive({
      size: 'medium',
      shape: 'circle'
    })
    return {
      userInfo,
      ...state,
      handleQuitLogin
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
    margin-right: 8px;
  }
  .username {
    font-size: 14px;
    color: #666;
  }
}
.el-avatar {
  box-shadow: 0 0 5px rgb(65, 65, 65);
}
</style>
