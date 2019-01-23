import request from '@/utils/request'

export function getStocks(param) {
  return request({
    'url': '/stock/api/v1/stock/info',
    'method': 'get',
    params: param
  })
}
