/* eslint-disable fp/no-this, fp/no-mutation, fp/no-unused-expression, fp/no-nil, fp/no-class */
const safeFn = require('../utils/safeFn')

class ValidationError extends Error {
  constructor(errors) {
    super('Validation errors were found')
    this.name = this.constructor.name
    safeFn(Error.captureStackTrace, this, this.constructor)
    this.errors = errors
  }
}

module.exports = ValidationError
