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
