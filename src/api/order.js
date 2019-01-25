import request from '@/utils/request'

export function getOrders(query) {
  return request({
    'url': '/order/api/v1/order/info',
    'method': 'get',
    'params': query
  })
}

export function getOrderStatus() {
  return request({
    'url': '/order/api/v1/order/orderstatus',
    'method': 'get'
  })
}

export function getOrderTypes() {
  return request({
    'url': '/order/api/v1/order/ordertypes',
    'method': 'get'
  })
}

export function getBaseStores() {
  return request({
    'url': '/order/api/v1/order/stores',
    'method': 'get'
  })
}

export function getCustomers(query) {
  return request({
    'url': '/order/api/v1/order/customer/list',
    'method': 'get',
    'params': query
  })
}
