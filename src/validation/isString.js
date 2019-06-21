/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isString = max => value =>
  !value ||
  (typeof value === 'string' && (!max || (max && !(value.length > max))))
    ? null
    : max
    ? `Expected a string no longer than ${max} characters`
    : 'Expected a string'

module.exports = isString
