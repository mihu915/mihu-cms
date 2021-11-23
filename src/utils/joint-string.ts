// 拼接字符串，以小驼峰的格式
export function jointString(prefix: string, postfix: string): string {
  if (prefix === undefined || postfix === undefined) return ''
  let entirePath = ''
  if (prefix.length) {
    entirePath = prefix + (postfix[0].toUpperCase() + postfix.slice(1))
  } else {
    entirePath = postfix
  }
  return entirePath
}
