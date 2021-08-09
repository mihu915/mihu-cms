const rules = {
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
      pattern: /^[\w+]{6,16}$/,
      message: '密码为6-16个字符',
      trigger: 'blur'
    }
  ],
  mobileNum: [
    {
      required: true,
      message: '手机号不可为空',
      trigger: 'blur'
    },
    {
      pattern:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      message: '手机号不符合标准',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不可为空',
      trigger: 'blur'
    },
    {
      pattern: /^\d+$/,
      message: '验证码不符合标准',
      trigger: 'blur'
    }
  ]
}

const PRIVATEKEY = '1118'

export { rules, PRIVATEKEY }
