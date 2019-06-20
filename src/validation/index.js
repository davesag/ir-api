const ValidationError = require('../errors/ValidationError')

const VALIDATIONS = {
  isArray: require('./isArray'),
  isGuid: require('./isGuid'),
  isPositiveNumber: require('./isPositiveNumber'),
  isRequired: require('./isRequired'),
  isString: require('./isString')
}

const validate = (payload, rules) => {
  const errors = Object.keys(payload).reduce((acc, elem) => {
    const validations = rules[elem] || []
    validations.forEach(rule => {
      if (!VALIDATIONS[rule](payload[elem])) {
        acc[elem] = acc[elem] || []
        acc[elem].push([payload[elem], rule])
      }
    })
    return acc
  }, {})

  if (Object.keys(errors).length !== 0) throw new ValidationError(errors)
}

module.exports = validate
