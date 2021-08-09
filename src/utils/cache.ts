class LocalCache {
  setCache(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string): string | null {
    const result = window.localStorage.getItem(key)
    if (result) {
      return JSON.parse(result)
    } else {
      return null
    }
  }
  deleteCache(key: string): void {
    window.localStorage.removeItem(key)
  }
  clearCache(): void {
    window.localStorage.clear()
  }
}

export default new LocalCache()
