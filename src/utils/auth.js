import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expiresDay) {
  return Cookies.set(TokenKey, token, { expires: expiresDay || 2 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
