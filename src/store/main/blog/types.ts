interface IBlogStore {
  blogConfig: any
  writeTagData: { list: []; total_count: number }[]
}

export { IBlogStore }
