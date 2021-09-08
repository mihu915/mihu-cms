function handleRoleOptions(roles: any[]) {
  const roleOptions: any[] = []
  for (const item of roles) {
    roleOptions.push({ label: item.role_name, value: item.id })
  }

  return roleOptions
}

export { handleRoleOptions }
