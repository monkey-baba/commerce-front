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

export function groupRole(userId) {
  const param = {
    id: userId
  }
  return request({
    url: '/auth/api/v1/role/groupRole',
    method: 'get',
    params: param
  })
}

export function updateGroupRole(groupId, roles) {
  const data = {
    groupId: groupId,
    roles: roles
  }
  return request({
    url: '/auth/api/v1/role/changeGroupRole',
    method: 'post',
    data
  })
}
