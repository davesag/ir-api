class RequestError extends Error {
  constructor(message, details) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.details = details
  }
}

module.exports = RequestError
