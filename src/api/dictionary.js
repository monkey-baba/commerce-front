import request from '@/utils/request'

export function getDictionarys(query) {
  const param = query
  return request({
    'url': '/basic/api/v1/dictionary/info',
    'method': 'get',
    params: param
  })
}

export function getDictionary(query) {
  const param = query
  return request({
    'url': '/basic/api/v1/dictionaryValue/info',
    'method': 'get',
    'params': param
  })
}
