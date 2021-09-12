import { IFormConfig } from '@/base-ui/mh-form'
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

function alterFormConfig(config: IFormConfig, field: string, key: string, value: any): void {
  config.formItemConfig.find((item: any) => {
    if (item.field === field) {
      item[key] = value
    }
  })
}

export { getConfigItemIndex, alterFormConfig }
