import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import { Auth } from '@/common'

const settings = {
  baseURL: ''
}

const ajax = axios.create({
  baseURL: settings.baseURL,
  timeout: 5000
})

ajax.interceptors.request.use(
  config => {
    if (Auth.getToken()) {
      config.headers['x-token'] = settings.token
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

ajax.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$store.dispatch('Logout').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default {
  serBaseURL(baseURL) {
    settings.baseURL = baseURL
  },
  get(url, data) {
    let params = '';
    if (data) {
      Object.keys(data).forEach(key => {
        params += `&${key}=${data[key]}`;
      });
      params = `?${params.substring(1)}`;
    }
    return ajax({
      method: 'get',
      url: `${url}${params}`
    })
  },
  post(url, data, headers) {
    return ajax({
      method: 'post',
      url,
      data,
      headers
    })
  }
}