import request from '@/utils/request'

export function getUsers(userQuery) {
  const param = userQuery
  return request({
    url: '/auth/api/v1/user/list',
    method: 'get',
    params: param
  })
}
