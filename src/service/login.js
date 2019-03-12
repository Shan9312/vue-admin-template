const userList = [{
  id: 1,
  name: 'nemo',
  pwd: 'abc123',
  token: 'token123',
  age: 18,
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['admin']
}, {
  id: 2,
  name: 'test',
  pwd: '123456',
  token: 'token234',
  age: 18,
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['test']
}]


export default {
  loginByUsername(username, pwd) {
    const users = userList.filter(user => user.name == username && user.pwd == pwd)
    return Promise.resolve(users.length > 0 ? users[0] : {})
  },
  getUserInfo(token) {
    const users = userList.filter(user => user.token == token)
    return Promise.resolve(users.length > 0 ? users[0] : {})
  },
  logout() {
    return Promise.resolve('success')
  }
}