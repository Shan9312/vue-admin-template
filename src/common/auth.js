const TOKEN_KEY = 'doooly-admin-key'

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

const removeToken = () => {
  return localStorage.setItem(TOKEN_KEY)
}

export default {
  getToken,
  setToken,
  removeToken
}