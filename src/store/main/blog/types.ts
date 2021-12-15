interface IBlogStore {
  blogConfig: any
  writeTagData: { list: []; total_count: number }
  writeData: any
}

export { IBlogStore }
