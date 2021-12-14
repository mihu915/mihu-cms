import { IFormConfig } from '@/base-ui/mh-form'
const writeDialogConfig: IFormConfig = {
  labelWidth: 100,
  itemLayout: {
    marginBottom: '20px'
  },
  formItemConfig: [
    { type: 'input', label: '文章标题：', field: 'title' },
    {
      type: 'uploadImage',
      label: '封面图：',
      field: 'cover',
      avatarOption: {
        limit: 1,
        action: '#',
        name: 'cover',
        style: {
          width: '200px',
          height: '100px'
        }
      }
    },
    {
      type: 'select',
      field: 'write_tag',
      selectOption: {
        multiple: true
      },
      label: '选择标签'
    },
    { type: 'textarea', label: '文章描述：', field: 'description' }
  ]
}
export { writeDialogConfig }
