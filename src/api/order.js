import request from '@/utils/fixrequest'

export function getOrders(query) {
  return request({
    'url': '/orders/get',
    'method': 'get',
    'params': query
  })
}
