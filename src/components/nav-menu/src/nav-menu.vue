<template>
  <div class="nav-menu">
    <el-menu
      background-color="#132736"
      text-color="#b7bdc3"
      active-text-color="#fff"
      class="el-menu-vertical"
      :collapse="!isCollapse"
    >
      <div class="cms-menu-title">
        <img class="logo" src="~@/assets/img/logo.svg" alt="logo" />
        <span class="title" v-if="isCollapse">Mihu_CMS</span>
      </div>

      <template v-for="(item, index) of userMenus" :key="index">
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>

            <template v-for="(childMenu, index) of item.children" :key="index">
              <div
                class="mh-menu-item"
                v-if="childMenu.type === 2"
                @click="gotoRouter(childMenu.url)"
              >
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
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const gotoRouter = (url: any) => {
      console.log(url)
      router.push(url)
    }
    const userMenus = computed(() => store.state.login.userMenus)
    return {
      userMenus,
      gotoRouter
    }
  }
})
</script>

<style scoped lang="less">
.cms-menu-title {
  width: 100%;
  color: #d8d8d8;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  align-items: center;
  display: flex;
  .logo {
    height: 20px;
    width: 64px;
    display: inline-block;
    vertical-align: middle;
    flex-shrink: 0;
  }
  .title {
    font-weight: bold;
  }
}

.mh-menu-item {
  background-color: #1b394e;
  padding: 8px 8px 0 8px;
  box-sizing: border-box;
  transition: all 0.3s linear;
}

.mh-menu-item:last-child {
  padding-bottom: 8px;
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
      background-color: #3e5769a9 !important;
      color: #fff !important;
    }
  }

  .el-menu-item.is-active {
    background-color: #1597f5 !important;
  }
}
</style>
