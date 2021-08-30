/* eslint-disable fp/no-unused-expression, fp/no-nil */
const ValidationError = require('../errors/ValidationError')

const VALIDATIONS = {
  isArrayOf: require('./isArrayOf')(),
  isGuid: require('./isGuid'),
  isOneOf: require('./isOneOf')(),
  isPositiveNumber: require('./isPositiveNumber')(),
  isRequired: require('./isRequired'),
  isString: require('./isString')(),
  isTime: require('./isTime')()
}

const validateFields = (payload, rules) => {
  const errors = Object.keys(payload).reduce((acc, elem) => {
    const validations = rules[elem] || []
    validations.forEach(rule => {
      const validator = typeof rule === 'string' ? VALIDATIONS[rule] : rule
      const value = payload[elem]
      const result = validator(value)
      if (result) {
        // eslint-disable-next-line fp/no-mutation
        acc[elem] = acc[elem] || []
        // eslint-disable-next-line fp/no-mutating-methods
        acc[elem].push([value, result])
      }
    })
    return acc
  }, {})

  // eslint-disable-next-line fp/no-throw
  if (Object.keys(errors).length !== 0) throw new ValidationError(errors)
}

module.exports = { validateFields }
