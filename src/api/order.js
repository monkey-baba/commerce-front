import request from '@/utils/request'

export function getOrders(query) {
  return request({
    'url': '/orders/get',
    'method': 'get',
    'params': query
  })
}
