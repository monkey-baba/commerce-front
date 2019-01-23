import request from '@/utils/request'

export function getCategories(query) {
  return request({
    'url': '/product/api/v1/category/list',
    'method': 'get',
    'params': query
  })
}
export function updateCategory(category) {
  const data = category
  return request({
    url: '/product/api/v1/category/update',
    method: 'post',
    data
  })
}

export function createCategory(category) {
  const data = category
  return request({
    url: '/product/api/v1/category/create',
    method: 'post',
    data
  })
}

export function createSubCategory(category) {
  const data = category
  return request({
    url: '/product/api/v1/category/create/sub',
    method: 'post',
    data
  })
}

export function deleteCategory(category) {
  const data = category
  return request({
    url: '/product/api/v1/category/delete',
    method: 'post',
    data
  })
}
