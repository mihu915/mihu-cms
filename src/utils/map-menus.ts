import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/mh-breadcrumb'

let firstMenuPath: any = null
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
        if (route) {
          if (!firstMenuPath) {
            firstMenuPath = route.path
          }
          routes.push(route)
        }
      } else {
        _recursionAddRoute(item.children)
      }
    })
  }
  _recursionAddRoute(userMenus)
  return routes
}

function getCurrentMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const currentMenu = getCurrentMenu(menu.children, currentPath)
      if (currentMenu) {
        breadcrumbs?.push({ name: menu.title })
        breadcrumbs?.push({ name: currentMenu.title, path: currentMenu.url })
        return currentMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

function pathMapBreadcrumb(userMenus: any[], currentPath: string) {
  const menuBreadcrumb: IBreadcrumb[] = []
  getCurrentMenu(userMenus, currentPath, menuBreadcrumb)
  return menuBreadcrumb
}

// 获取所有父级菜单
function getParentMenu(userMenus: any[]) {
  const parentMenuTitle: any[] = []
  userMenus.forEach((item) => {
    parentMenuTitle.push(item)
  })

  return parentMenuTitle
}
export { mapMenus, firstMenuPath, getCurrentMenu, pathMapBreadcrumb, getParentMenu }
