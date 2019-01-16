import request from '@/utils/request'

export function userGroup(userId) {
  const param = {
    id: userId
  }
  return request({
    url: '/auth/api/v1/group/userGroup',
    method: 'get',
    params: param
  })
}

export function updateUserGroup(userId, groups) {
  const data = {
    userId: userId,
    groups: groups
  }
  return request({
    url: '/auth/api/v1/group/changeUserGroup',
    method: 'post',
    data
  })
}
