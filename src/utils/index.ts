import localCache from './cache'
import encrypt from './encrypt'
import { getConfigItemIndex } from './handleConfig'
import { handleRoleOptions } from './map-role'
import { handleUnixFormat } from './handle-time-format'
import { emitter } from './event-bus'
import { stringToNumberArray, arrayToString } from './handle-array'

import {
  mapMenus,
  firstMenuPath,
  getCurrentMenu,
  pathMapBreadcrumb,
  getParentMenuInfo,
  filterParentMenuId
} from './map-menus'

export {
  localCache,
  encrypt,
  firstMenuPath,
  emitter,
  mapMenus,
  getCurrentMenu,
  pathMapBreadcrumb,
  getParentMenuInfo,
  getConfigItemIndex,
  handleRoleOptions,
  handleUnixFormat,
  stringToNumberArray,
  arrayToString,
  filterParentMenuId
}
