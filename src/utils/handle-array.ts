const stringToNumberArray = (str: string) => {
  const stringArray = str.split(',')
  const numberArray: number[] = []
  stringArray.map((item) => {
    if (!isNaN(parseInt(item))) {
      numberArray.push(parseInt(item))
    }
  })

  return numberArray
}

const arrayToString = (array: number[]) => {
  const str = array.join(',')
  return str
}

export { stringToNumberArray, arrayToString }
