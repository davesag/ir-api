/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isArray = value =>
  value === null ||
  value === undefined ||
  (typeof value === 'number' && (isNaN(value) || value > 0))

module.exports = isArray
