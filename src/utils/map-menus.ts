import { RouteRecordRaw } from 'vue-router'
import { router } from '@/router'
function mapMenus(userMenus: any[]): RouteRecordRaw[] {
  const context = require.context('../router/main', true, /\.ts/)
  const routes: RouteRecordRaw[] = []
  const allRoutes: RouteRecordRaw[] = []

  // 加载全部routes
  context.keys().forEach((item) => {
    const route = require('../router/main' + item.split('.')[1])
    allRoutes.push(route.default)
  })

  // 匹配对应route
  function _recursionAddRoute(menus: any) {
    menus.forEach((item: any) => {
      if (item.type === 2) {
        const route = allRoutes.find((route) => {
          return route.path === item.url
        })
        if (route) router.addRoute('main', route)
      } else {
        console.log(item.children)
        _recursionAddRoute(item.children)
      }
    })
  }

  _recursionAddRoute(userMenus)

  return routes
}

export { mapMenus }
