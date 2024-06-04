/* eslint-disable fp/no-nil */
/**
 * if the value is empty or an array of allowed values return null.
 *  else return error message.
 * ignores the value if it's empty.  use isRequired to enforce requirement
 */
const isArrayOf =
  (allowed = []) =>
  value =>
    !value ||
    (Array.isArray(value) &&
      (allowed.length === 0 || (allowed.length !== 0 && value.every(val => allowed.includes(val)))))
      ? null
      : allowed.length === 0
        ? 'Expected an array'
        : `Expected an array containing ${allowed.join(',')}`

module.exports = isArrayOf
