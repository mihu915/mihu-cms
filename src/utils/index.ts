import localCache from './cache'
import encrypt from './encrypt'
import { getConfigItemIndex } from './handleConfig'
import { handleRoleOptions } from './map-role'
import { handleUnixFormat } from './handle-time-format'
import {
  mapMenus,
  firstMenuPath,
  getCurrentMenu,
  pathMapBreadcrumb,
  getParentMenuInfo
} from './map-menus'

export {
  localCache,
  encrypt,
  firstMenuPath,
  mapMenus,
  getCurrentMenu,
  pathMapBreadcrumb,
  getParentMenuInfo,
  getConfigItemIndex,
  handleRoleOptions,
  handleUnixFormat
}
