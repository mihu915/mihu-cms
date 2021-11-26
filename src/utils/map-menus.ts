import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/mh-breadcrumb'

let firstMenuPath: any = null

// 动态注册路由
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
            console.log(route.path)
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

// 获取当前菜单
function getCurrentMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const currentMenu = getCurrentMenu(menu.children, currentPath)
      if (currentMenu) {
        breadcrumbs?.push({ name: menu.title })
        breadcrumbs?.push({ name: currentMenu.title, path: currentMenu.url })
        return currentMenu
      }
    } else if (menu.type === 2 && currentPath.includes(menu.url)) {
      return menu
    }
  }
}

// 获取当前对应的面包屑
function pathMapBreadcrumb(userMenus: any[], currentPath: string) {
  const menuBreadcrumb: IBreadcrumb[] = []
  getCurrentMenu(userMenus, currentPath, menuBreadcrumb)
  return menuBreadcrumb
}

// 获取父级菜单id和title,排除指定id
function getParentMenuInfo(menuList: any[], excludeId?: number) {
  if (!menuList) return
  const parentMenuTitle: any[] = []
  menuList.forEach((item) => {
    if (item.id === excludeId && excludeId) {
      return
    } else {
      parentMenuTitle.push({ value: item.title, label: item.id })
    }
  })

  return parentMenuTitle
}

// 过滤掉父菜单id并返回新的id数组
function filterParentMenuId(allMenuList: any[], menusId: number[]) {
  if (menusId.length === 0) return []
  menusId.map((id, index, array) => {
    allMenuList.map((parentMenu) => {
      if (parentMenu.id === id) {
        array.splice(index, 1)
      }
    })
  })
  return menusId
}

export {
  mapMenus,
  firstMenuPath,
  getCurrentMenu,
  pathMapBreadcrumb,
  getParentMenuInfo,
  filterParentMenuId
}
