/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isPositiveNumber = max => value =>
  value === null ||
  value === undefined ||
  (typeof value === 'number' && (isNaN(value) || (value > 0 && (!max || (max && !(value > max))))))
    ? null
    : max
    ? `Expected a positive number no greater than ${max}`
    : 'Expected a positive number'

module.exports = isPositiveNumber
