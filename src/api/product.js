import request from '@/utils/request'

export function getProducts(query) {
  return request({
    'url': '/product/api/v1/local/product',
    'method': 'get'
  })
}
