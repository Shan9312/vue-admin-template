const isvalidUsername = (str) => {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  isvalidUsername,
  isExternal
}