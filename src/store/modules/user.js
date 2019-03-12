import { LoginService } from '@/service'
import { Auth } from '@/common'

const user = {
  state: {
    userInfo: {},
    roles: []
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        LoginService.loginByUsername(userInfo.username, userInfo.password).then(res => {
          Auth.setToken(res.data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        LoginService.getUserInfo(Auth.getToken()).then(res => {
          if (res.data.roles && res.data.roles.length > 0) {
            commit('SET_ROLES', res.data.roles)
            commit('SET_USER_INFO', res.data)
          } else {
            reject('getUserInfo: 角色列表不能为空')
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_USER_INFO', {})
          commit('SET_ROLES', [])
          Auth.removeToken()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user