import request from '@/utils/request'

export function getStores(param) {
  const data = param
  return request({
    'url': '/stock/api/v1/reservoirarea/info',
    'method': 'post',
    data
  })
}
export function createStore(store) {
  const data = store
  return request({
    url: '/stock/api/v1/reservoirarea/add',
    method: 'post',
    data
  })
}

export function getClassifyData() {
  return request({
    url: '/stock/api/v1/reservoirarea/classify',
    method: 'get'
  })
}

export function getStatusData() {
  return request({
    url: '/stock/api/v1/reservoirarea/status',
    method: 'get'
  })
}

export function updateStore(store) {
  const data = store
  return request({
    url: '/stock/api/v1/reservoirarea/update',
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
    url: '/stock/api/v1/reservoirarea/detail',
    method: 'get',
    params: param
  })
}
