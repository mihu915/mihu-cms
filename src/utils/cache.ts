class LocalCache {
  // 存储缓存
  setCache(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 获取缓存数据
  getCache(key: string): string | null {
    const result = window.localStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    } else {
      return null
    }
  }
  // 删除缓存数据
  deleteCache(key: string): void {
    window.localStorage.removeItem(key)
  }
  // 清空缓存数据
  clearCache(): void {
    window.localStorage.clear()
  }
}

export default new LocalCache()
