import request from '@/utils/request'

export function getConsignments(query) {
  return request({
    'url': '/order/api/v1/consignment/search',
    'method': 'get',
    'params': query
  })
}

export function getConsignmentStatus() {
  return request({
    'url': '/order/api/v1/eunm/consignmentstatus',
    'method': 'get'
  })
}

export function getConsignmentDetail(id) {
  const param = {
    id: id
  }
  return request({
    'url': '/order/api/v1/consignment/detail',
    'method': 'get',
    'params': param
  })
}
