import request from '@/utils/request'

export function getPosList(query) {
  return request({
    'url': '/stock/api/v1/storePos/pos/list',
    'method': 'get',
    'params': query
  })
}

export function getBaseStoreData() {
  return request({
    url: '/stock/api/v1/storePos/baseStore',
    method: 'get'
  })
}

export function createStorePos(storePos) {
  const data = storePos
  return request({
    url: '/stock/api/v1/storePos/add',
    method: 'post',
    data
  })
}

export function getPosTypeData() {
  return request({
    url: '/stock/api/v1/storePos/posType',
    method: 'get'
  })
}

export function getStorePos(param) {
  const data = param
  return request({
    'url': '/stock/api/v1/storePos/info',
    'method': 'post',
    data
  })
}

export function deleteStorePos(storePos) {
  const data = storePos
  return request({
    url: '/stock/api/v1/storePos/delete',
    method: 'post',
    data
  })
}
