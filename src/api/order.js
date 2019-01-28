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

export function getPlatforms() {
  return request({
    'url': '/order/api/v1/order/platforms',
    'method': 'get'
  })
}

export function getDeliveryTypes() {
  return request({
    'url': '/order/api/v1/order/deliveryTypes',
    'method': 'get'
  })
}

export function getCarriers() {
  return request({
    'url': '/order/api/v1/order/carriers',
    'method': 'get'
  })
}

export function getInvoiceTypes() {
  return request({
    'url': '/order/api/v1/order/invoiceTypes',
    'method': 'get'
  })
}
export function getSkuSpecs() {
  return request({
    'url': '/order/api/v1/order/skuSpecs',
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

export function getPosList(query) {
  return request({
    'url': '/order/api/v1/order/pos/list',
    'method': 'get',
    'params': query
  })
}
