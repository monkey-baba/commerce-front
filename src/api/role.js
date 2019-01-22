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

export function getRoles(query) {
  const param = query
  return request({
    url: '/auth/api/v1/role/list',
    method: 'get',
    params: param
  })
}

export function updateRole(role) {
  const data = role
  return request({
    url: '/auth/api/v1/role/update',
    method: 'post',
    data
  })
}

export function createRole(role) {
  const data = role
  return request({
    url: '/auth/api/v1/role/create',
    method: 'post',
    data
  })
}

export function deleteRole(roles) {
  const data = roles
  return request({
    url: '/auth/api/v1/role/delete',
    method: 'delete',
    data
  })
}

export function parentRole(roleId) {
  const param = {
    id: roleId
  }
  return request({
    url: '/auth/api/v1/role/parentRole',
    method: 'get',
    params: param
  })
}

export function childRole(roleId) {
  const param = {
    id: roleId
  }
  return request({
    url: '/auth/api/v1/role/childRole',
    method: 'get',
    params: param
  })
}

export function updateParentRole(roleId, roles) {
  const data = {
    roleId: roleId,
    roles: roles
  }
  return request({
    url: '/auth/api/v1/role/changeParentRole',
    method: 'post',
    data
  })
}

export function updateChildRole(roleId, roles) {
  const data = {
    roleId: roleId,
    roles: roles
  }
  return request({
    url: '/auth/api/v1/role/changeChildRole',
    method: 'post',
    data
  })
}

export function findRoleByName(roleName) {
  const data = {
    name: roleName
  }
  return request({
    url: '/auth/api/v1/role/findRoleByName',
    method: 'get',
    params: data
  })
}
