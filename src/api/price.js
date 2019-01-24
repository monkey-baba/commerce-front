import request from '@/utils/request'

export function getPrices(query) {
  return request({
    'url': '/product/api/v1/price/list',
    'method': 'get',
    'params': query
  })
}
export function updatePrice(price) {
  const data = price
  return request({
    url: '/product/api/v1/price/update',
    method: 'post',
    data
  })
}

export function createPrice(price) {
  const data = price
  return request({
    url: '/product/api/v1/price/create',
    method: 'post',
    data
  })
}

export function deletePrice(price) {
  const data = price
  return request({
    url: '/product/api/v1/price/delete',
    method: 'post',
    data
  })
}
export function getChannel() {
  return request({
    'url': '/product/api/v1/price/channellist',
    'method': 'get'
  })
}
