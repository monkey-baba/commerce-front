import request from '@/utils/request'

export function getPriceRows(priceid) {
  return request({
    'url': '/product/api/v1/pricerow/' + priceid,
    'method': 'get'
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

export function getPrice(productid) {
  return request({
    'url': '/product/api/v1/price/' + productid,
    'method': 'get'
  })
}

