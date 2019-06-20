const ResponseError = require('../errors/ResponseError')
const RequestError = require('../errors/RequestError')

const transformError = error => {
  // console.log(error)
  const details = error.config ? { url: error.config.url } : {}

  if (error.response) {
    throw new ResponseError(
      error.response.data['Message'],
      error.response.status,
      details
    )
  }

  if (error.request) {
    throw new RequestError(error.message, details)
  }

  throw new Error(error.message)
}

module.exports = transformError
