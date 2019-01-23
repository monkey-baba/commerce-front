import request from '@/utils/request'

export function getDicts(query) {
  const data = query
  return request({
    url: '/basic/api/v1/dict/list',
    method: 'get',
    params: data
  })
}

export function createDict(dict) {
  const data = dict
  return request({
    url: '/basic/api/v1/dict/create',
    method: 'post',
    data
  })
}
