/**
 * if the value is empty or an array return null.
 *  else return error message.
 * ignores the value if it's empty.  use isRequired to enforce requirement
 */
const isArray = value =>
  !value || Array.isArray(value) ? null : 'Expected an array'

module.exports = isArray
