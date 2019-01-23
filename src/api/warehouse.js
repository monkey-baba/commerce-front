import request from '@/utils/request'

export function getWarehouses(param) {
  return request({
    'url': '/stock/api/v1/warehouse/info',
    'method': 'get',
    params: param
  })
}

export function createWarehouse(warehouse) {
  const data = warehouse
  return request({
    url: '/stock/api/v1/warehouse/create',
    method: 'post',
    data
  })
}

export function deleteWarehouse(warehouse) {
  const data = warehouse
  return request({
    url: '/stock/api/v1/warehouse/delete',
    method: 'post',
    data
  })
}

export function enableWarehouse(warehouse) {
  const data = warehouse
  return request({
    url: '/stock/api/v1/warehouse/enable',
    method: 'post',
    data
  })
}

export function updateWarehouse(warehouse) {
  const data = warehouse
  return request({
    url: '/stock/api/v1/warehouse/update',
    method: 'post',
    data
  })
}

