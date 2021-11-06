import localCache from './cache'
import encrypt from './encrypt'
import { getConfigItemIndex, alterFormConfig } from './handleConfig'
import { handleRoleOptions } from './map-role'
import { handleUnixFormat, getNowTimeFrameByUnix } from './handle-time-format'
import { emitter } from './event-bus'
import { stringToNumberArray, arrayToString } from './handle-array'
import { jointString } from './joint-string'

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
  alterFormConfig,
  handleRoleOptions,
  handleUnixFormat,
  getNowTimeFrameByUnix,
  stringToNumberArray,
  arrayToString,
  filterParentMenuId,
  jointString
}
