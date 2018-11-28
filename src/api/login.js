import request from '@/utils/request'

export function loginByUsername(id, password) {
  const data = {
    id,
    password
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
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

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

