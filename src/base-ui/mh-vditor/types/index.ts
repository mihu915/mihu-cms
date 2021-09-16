interface IVditorOptions {
  /**
   * @description: 如果传入的是HTMLElement则需要设置id或将enable设置为false
   */
  cache?: {
    id?: string
    enable?: boolean
  }

  /**
   * @description: 是否显示大纲
   * @param { enable: 启用|禁用，position：位置 }
   */
  outline: {
    enable: boolean
    position: 'left' | 'right'
  }
  height?: number
  width?: number | string
  minHeight?: number
  placeholder?: string
  theme: 'dark' | 'classic'
  icon?: 'ant' | 'material'
  value?: string
}

export { IVditorOptions }
