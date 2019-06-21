const ValidationError = require('../errors/ValidationError')

const VALIDATIONS = {
  isArrayOf: require('./isArrayOf')(),
  isGuid: require('./isGuid'),
  isPositiveNumber: require('./isPositiveNumber')(),
  isRequired: require('./isRequired'),
  isString: require('./isString')()
}

const validateFields = (payload, rules) => {
  const errors = Object.keys(payload).reduce((acc, elem) => {
    const validations = rules[elem] || []
    validations.forEach(rule => {
      const validator = typeof rule === 'string' ? VALIDATIONS[rule] : rule
      const value = payload[elem]
      const result = validator(value)
      if (result) {
        acc[elem] = acc[elem] || []
        acc[elem].push([value, result])
      }
    })
    return acc
  }, {})

  if (Object.keys(errors).length !== 0) throw new ValidationError(errors)
}

module.exports = { validateFields }
