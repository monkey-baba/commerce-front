import request from '@/utils/request'

export function getProducts(query) {
  return request({
    'url': '/product/api/v1/product/list',
    'method': 'get',
    'params': query
  })
}
export function updateProduct(product) {
  const data = product
  return request({
    url: '/product/api/v1/product/update',
    method: 'post',
    data
  })
}

export function createProduct(product) {
  const data = product
  return request({
    url: '/product/api/v1/product/create',
    method: 'post',
    data
  })
}

export function deleteProduct(product) {
  const data = product
  return request({
    url: '/product/api/v1/product/delete',
    method: 'post',
    data
  })
}

export function approvedProduct(product) {
  const data = product
  return request({
    url: '/product/api/v1/product/approved',
    method: 'post',
    data
  })
}

export function unApprovedProduct(product) {
  const data = product
  return request({
    url: '/product/api/v1/product/unapproved',
    method: 'post',
    data
  })
}

export function getChannel() {
  return request({
    'url': '/product/api/v1/product/channellist',
    'method': 'get'
  })
}

export function getAttr() {
  return request({
    'url': '/product/api/v1/product/productattrlist',
    'method': 'get'
  })
}

export function getApprovedStatus() {
  return request({
    'url': '/product/api/v1/product/approvedstatuslist',
    'method': 'get'
  })
}

export function getUnit() {
  return request({
    'url': '/product/api/v1/product/unitlist',
    'method': 'get'
  })
}

export function getSpec() {
  return request({
    'url': '/product/api/v1/sku/speclist',
    'method': 'get'
  })
}

export function getBaicData(id) {
  return request({
    'url': '/product/api/v1/product/basic/' + id,
    'method': 'get'
  })
}

export function updateBasic(product) {
  const data = product
  return request({
    'url': '/product/api/v1/product/updatebasic',
    'method': 'post',
    data
  })
}

