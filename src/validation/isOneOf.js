/**
 * if the value is empty or an allowed string return null.
 *  else return error message.
 * ignores the value if it's empty.  use isRequired to enforce requirement
 */
const isOneOf =
  (allowed = []) =>
  value =>
    !value || allowed.includes(value) ? null : `Expected one of ${allowed.join(',')}`

module.exports = isOneOf
