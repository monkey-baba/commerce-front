import request from '@/utils/request'

export function getDictionarys(query) {
  const data = query
  return request({
    'url': '/basic/api/v1/dict/info',
    'method': 'post',
    data
  })
}

export function getDictionary(query) {
  const data = query
  return request({
    'url': '/basic/api/v1/dictionaryvalue/info',
    'method': 'post',
    data
  })
}
