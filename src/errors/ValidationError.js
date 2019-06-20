class ValidationError extends Error {
  constructor(message, fields) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.fields = fields
  }
}

module.exports = ValidationError
