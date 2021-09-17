import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { localCache, firstMenuPath } from '@/utils'
import { ElMessageBox } from 'element-plus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: []
  },
  {
    path: '/markdown',
    name: 'markdown',
    component: () => import('@/views/markdown/markdown.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

// 打开确认对话框方法
const openBox = () => {
  return ElMessageBox.confirm('即将退出该页面，是否确认？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

router.beforeEach((to, from) => {
  // if (from.path === '/main/essay/write/markdown') {
  //   console.log(from.path)
  //   console.log(to.path)
  //   openBox()
  //     .then(() => {
  //       router.replace(to.path)
  //       return true
  //     })
  //     .catch(() => {
  //       return false
  //     })
  // }
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenuPath
  }
})
export { router }
