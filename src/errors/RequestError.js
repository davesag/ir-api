/* eslint-disable fp/no-this, fp/no-mutation, fp/no-unused-expression, fp/no-nil, fp/no-class */
const safeFn = require('../utils/safeFn')

class RequestError extends Error {
  constructor(message, details) {
    super(message)
    this.name = this.constructor.name
    safeFn(Error.captureStackTrace, this, this.constructor)
    this.details = details
  }
}

module.exports = RequestError
