export const rules = {
  username: [
    {
      required: true,
      message: '用户名不可为空',
      trigger: 'blur'
    },
    {
      pattern: /^[\w+]{4,12}$/,
      message: '用户名为6-12个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不可为空',
      trigger: 'blur'
    },
    {
      pattern: /^[\w+]{4,12}$/,
      message: '密码为8-16个字符',
      trigger: 'blur'
    }
  ]
}
