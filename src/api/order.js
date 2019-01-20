import request from '@/utils/request'

export function getOrders(query) {
  return request({
    'url': '/order/api/v1/order/info',
    'method': 'get',
    'params': query
  })
}
