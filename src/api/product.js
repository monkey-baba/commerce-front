import request from '@/utils/request'

export function getProducts(query) {
  return request({
    'url': '/products/get',
    'method': 'get',
    'params': query
  })
}
