const ResponseError = require('../errors/ResponseError')
const RequestError = require('../errors/RequestError')
const defined = require('./defined')
const { getTransport } = require('./transport')

const MAX_RETRIES = 3
const maxRetries = config =>
  defined(config._retryCount) && config._retryCount === MAX_RETRIES

const increment = config => ({
  ...config,
  _retryCount: config._retryCount ? config._retryCount + 1 : 1
})

const delay = config => config._retryCount * 250

const canRetry = error =>
  error.code === 'ECONNABORTED' &&
  error.config &&
  !maxRetries(error.config) &&
  error.config.url.includes('/Get')

const transformError = error => {
  if (canRetry(error)) {
    const { retry } = getTransport()
    return new Promise(resolve => {
      const config = increment(error.config)
      return setTimeout(() => resolve(retry(config)), delay(config))
    })
  }

  const details = error.config
    ? { method: error.config.method, url: error.config.url }
    : {}
  if (error.code) details.code = error.code

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
