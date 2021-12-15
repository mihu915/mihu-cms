// 将role列表转化为{label：，value:}的格式
function handleSelectOptions(data: any[], type: string) {
  const selectOptions = []
  switch (type) {
    case 'role':
      for (const item of data) {
        selectOptions.push({ label: item.role_name, value: item.id })
      }
      break
    case 'writeTag':
      for (const item of data) {
        selectOptions.push({ label: item.tag_name, value: item.id })
      }
      break
  }

  return selectOptions
}

export { handleSelectOptions }
