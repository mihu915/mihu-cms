// 拼接字符串，以小驼峰的格式
export function jointString(prefix: string, postfix: string): string {
  let entirePath = ''
  if (prefix.length) {
    entirePath = prefix + (postfix[0].toUpperCase() + postfix.slice(1))
  } else {
    entirePath = postfix
  }
  return entirePath
}
