export default {
  isvalidUsername(str) {
    const valid_map = ['admin', 'table','nested']
    return valid_map.indexOf(str.trim()) >= 0
  },
  isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }
}