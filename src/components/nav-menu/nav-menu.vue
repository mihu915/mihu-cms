<template>
  <div class="nav-menu">
    <el-menu
      background-color="#132736"
      text-color="#b7bdc3"
      active-text-color="#fff"
      class="el-menu-vertical"
    >
      <template v-for="(item, index) of userMenu" :key="index">
        <template v-if="item.level === 1">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>

            <template v-for="(childMenu, index) of item.children" :key="index">
              <div class="mh-menu-item" v-if="childMenu.level === 2">
                <el-menu-item :index="childMenu.id + ''">{{ childMenu.title }}</el-menu-item>
              </div>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from '@/store'
import { computed } from 'vue'

export default defineComponent({
  setup() {
    const store = useStore()
    const userMenu = computed(() => store.state.login.userMenu)
    return {
      userMenu
    }
  }
})
</script>

<style scoped lang="less">
.mh-menu-item {
  background-color: #1b394e;
  padding: 8px 8px 0 8px;
  box-sizing: border-box;
}

.mh-menu-item:not(:first-child) {
  padding: 8px;
}

.nav-menu {
  height: 100%;
  background-color: #1b394e;

  .el-menu {
    border-right: none;

    .el-menu-item {
      height: 40px;
      line-height: 40px;
      min-width: 60%;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: #1b394e !important;
    }

    .el-menu-item:hover {
      background-color: #1597f5 !important;
      color: #fff !important;
    }
  }

  .el-menu-item.is-active {
    background-color: #1597f5 !important;
  }
}
</style>
