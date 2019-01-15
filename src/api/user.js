import request from '@/utils/request'

export function getUsers(userQuery) {
  const param = userQuery
  return request({
    url: '/auth/api/v1/user/list',
    method: 'get',
    params: param
  })
}

export function updateUser(user) {
  const data = user
  return request({
    url: '/auth/api/v1/user/update',
    method: 'post',
    data
  })
}

export function passwordUser(user) {
  const data = user
  return request({
    url: '/auth/api/v1/user/changePwd',
    method: 'post',
    data
  })
}

export function enableUser(user) {
  const data = user
  return request({
    url: '/auth/api/v1/user/enable',
    method: 'post',
    data
  })
}
