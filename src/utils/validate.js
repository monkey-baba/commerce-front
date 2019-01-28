/**
 * Created by jiachenpan on 16/11/18.
 */
import validator from 'validator'

export function isvalidUsername(str) {
  return validator.matches(str, /^[a-zA-Z0-9]{5,20}$/)
}

export function isEmpty(str) {
  return validator.isEmpty(str)
}

export function isEmail(str) {
  return validator.isEmail(str)
}

export function isMobilePhone(str) {
  return validator.isMobilePhone(str, 'zh-CN')
}

export function isCharOrNumber(str, min, max) {
  if (min !== undefined && str.length < min) {
    return false
  }
  if (max !== undefined && str.length > max) {
    return false
  }
  return validator.matches(str, /^[a-zA-Z0-9]+$/)
}

export function isDecimal(str, digitMin, digitMax) {
  const options = { decimal_digits: (digitMin || 0) + ',' + (digitMax || '') }
  return validator.isDecimal(str, options)
}
