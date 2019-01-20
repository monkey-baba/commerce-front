import request from '@/utils/request'

export function getDictionarys(query) {
  const data = query
  return request({
    'url': '/basic/api/v1/dict/info',
    'method': 'post',
    data
  })
}

export function createDictionary(dictionary) {
  const data = dictionary
  return request({
    url: '/basic/api/v1/dict/add',
    method: 'post',
    data
  })
}

export function deleteDictionarys(dictionary) {
  const data = dictionary
  return request({
    url: '/basic/api/v1/dict/delete',
    method: 'post',
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
export function editDictionaryAndValue(dictionaryValues) {
  const data = dictionaryValues
  return request({
    'url': '/basic/api/v1/dictionaryvalue/info',
    'method': 'post',
    data
  })
}
