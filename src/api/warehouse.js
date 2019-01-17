import request from '@/utils/request'

export function getWarehouses(param) {
  return request({
    'url': '/stock/api/v1/warehouse/info',
    'method': 'get',
    params: param
  })
}
