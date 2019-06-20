/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isString = value => !value || typeof value === 'string'

module.exports = isString
