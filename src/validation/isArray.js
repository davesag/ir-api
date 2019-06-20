/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isArray = value => !value || Array.isArray(value)

module.exports = isArray
