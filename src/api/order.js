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
    'url': '/order/api/v1/eunm/orderstatus',
    'method': 'get'
  })
}

export function getOrderTypes() {
  return request({
    'url': '/order/api/v1/eunm/ordertypes',
    'method': 'get'
  })
}

export function getBaseStores() {
  return request({
    'url': '/order/api/v1/eunm/stores',
    'method': 'get'
  })
}

export function getPlatforms() {
  return request({
    'url': '/order/api/v1/eunm/platforms',
    'method': 'get'
  })
}

export function getDeliveryTypes() {
  return request({
    'url': '/order/api/v1/eunm/deliveryTypes',
    'method': 'get'
  })
}

export function getCarriers() {
  return request({
    'url': '/order/api/v1/eunm/carriers',
    'method': 'get'
  })
}

export function getInvoiceTypes() {
  return request({
    'url': '/order/api/v1/eunm/invoiceTypes',
    'method': 'get'
  })
}
export function getSkuSpecs() {
  return request({
    'url': '/order/api/v1/eunm/skuSpecs',
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

export function getPaymentTypes() {
  return request({
    'url': '/order/api/v1/eunm/paymentTypes',
    'method': 'get'
  })
}

export function getSkuList(query) {
  return request({
    'url': '/order/api/v1/order/sku/list',
    'method': 'get',
    'params': query
  })
}

export function createOrder(form) {
  const data = form
  return request({
    'url': '/order/api/v1/order/create',
    'method': 'post',
    data
  })
}
