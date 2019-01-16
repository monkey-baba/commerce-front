import request from '@/utils/request'

export function getStocks(query) {
  return request({
    'url': '/stock/api/v1/stock/query',
    'method': 'get'
    // 'params': query
  })
}
