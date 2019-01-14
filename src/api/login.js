import request from '@/utils/request'
import store from '../store'

export function loginByUsername(username, password) {
  const data = {
    username,
    password,
    grant_type: 'password',
    client_id: store.getters.appId,
    client_secret: store.getters.appId
  }
  return request({
    url: '/oauth2/oauth/token',
    method: 'post',
    params: data
  })
}

export function logout(token) {
  const data = {
    token
  }
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  // const data = {
  //   access_token: token.access_token
  // }
  return request({
    url: '/auth/api/v1/user/info',
    method: 'get'
  })
}

