import { IFormConfig } from '@/base-ui/mh-form'
import { BASE_URL } from '@/service/request/config'
const cfFormConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '20px'
  },
  formItemConfig: [
    { type: 'input', label: '博客主名称：', field: 'blogger_name' },
    {
      type: 'uploadImage',
      label: '博客主头像：',
      field: 'blogger_avatar',
      avatarOption: {
        limit: 1,
        action: BASE_URL + '/files/blog/avatar',
        name: 'blogger_avatar'
      }
    },
    {
      type: 'input',
      label: '博客标题：',
      field: 'blog_title'
    },
    {
      type: 'input',
      label: '个性签名：',
      field: 'signature'
    }
  ]
}

export { cfFormConfig }
