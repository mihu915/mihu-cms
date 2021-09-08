function getConfigItemIndex(array: any[], key: string, value: string) {
  let index = 0
  if (key !== undefined) {
    for (index; index < array.length; index++) {
      if (array[index][key] === value) {
        return index
      }
    }
  }
}

export { getConfigItemIndex }
