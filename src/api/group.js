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

export function getGroups(query) {
  const param = query
  return request({
    url: '/auth/api/v1/group/list',
    method: 'get',
    params: param
  })
}

export function updateGroup(group) {
  const data = group
  return request({
    url: '/auth/api/v1/group/update',
    method: 'post',
    data
  })
}

export function createGroup(group) {
  const data = group
  return request({
    url: '/auth/api/v1/group/create',
    method: 'post',
    data
  })
}

export function deleteGroup(groups) {
  const data = groups
  return request({
    url: '/auth/api/v1/group/delete',
    method: 'delete',
    data
  })
}
