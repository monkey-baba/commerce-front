import request from '@/utils/request'

export function userRole(userId) {
  const param = {
    id: userId
  }
  return request({
    url: '/auth/api/v1/role/userRole',
    method: 'get',
    params: param
  })
}

export function updateUserRole(userId, roles) {
  const data = {
    userId: userId,
    roles: roles
  }
  return request({
    url: '/auth/api/v1/role/changeUserRole',
    method: 'post',
    data
  })
}
