import request from '@/utils/request'

export function getCustomers(param) {
  return request({
    'url': '/customer/api/v1/customer/info',
    'method': 'get',
    params: param
  })
}

export function createCustomer(customer) {
  const data = customer
  return request({
    url: '/customer/api/v1/customer/create',
    method: 'post',
    data
  })
}

export function deleteCustomer(customer) {
  const data = customer
  return request({
    url: '/customer/api/v1/customer/delete',
    method: 'post',
    data
  })
}

export function updateCustomer(customer) {
  const data = customer
  return request({
    url: '/customer/api/v1/customer/update',
    method: 'post',
    data
  })
}

export function getCustomerStatus() {
  return request({
    'url': '/customer/api/v1/customer/status',
    'method': 'get'
  })
}

