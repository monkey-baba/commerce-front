import request from '@/utils/request'

export function search(query) {
  return request({
    url: '/order/api/v1/routerrule/search',
    method: 'get',
    params: query
  })
}

export function update(data) {
  return request({
    url: '/order/api/v1/routerrule/update',
    method: 'post',
    data
  })
}
