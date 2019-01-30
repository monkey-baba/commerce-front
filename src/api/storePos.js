import request from '@/utils/request'

export function getStores(param) {
  const data = param
  return request({
    'url': '/stock/api/v1/store/info',
    'method': 'post',
    data
  })
}

export function getPosList(query) {
  return request({
    'url': '/stock/api/v1/storePos/pos/list',
    'method': 'get',
    'params': query
  })
}

export function createStore(store) {
  const data = store
  return request({
    url: '/stock/api/v1/store/add',
    method: 'post',
    data
  })
}

export function getClassifyData() {
  return request({
    url: '/stock/api/v1/store/classify',
    method: 'get'
  })
}

export function getStatusData() {
  return request({
    url: '/stock/api/v1/store/status',
    method: 'get'
  })
}

export function updateStore(store) {
  const data = store
  return request({
    url: '/stock/api/v1/store/update',
    method: 'post',
    data
  })
}

export function getStoresDetail(storeId) {
  console.log('storeId----' + storeId)
  const param = {
    id: storeId
  }
  return request({
    url: '/stock/api/v1/store/detail',
    method: 'get',
    params: param
  })
}
