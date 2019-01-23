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

export function getDictValues(code) {
  const data = {
    type: code
  }
  return request({
    url: '/basic/api/v1/dict/values',
    method: 'get',
    params: data
  })
}

export function editDict(form) {
  const data = form
  return request({
    url: '/basic/api/v1/dict/edit',
    method: 'post',
    data
  })
}

export function deleteDict(dicts) {
  const data = dicts
  return request({
    url: '/basic/api/v1/dict/delete',
    method: 'delete',
    data
  })
}
