/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-mutation */
const axios = require('axios')
const { transportOptions: defaults, defaultHeaders } = require('../defaults')
const transformResponse = require('./transformResponse')
const makeTransformError = require('./makeTransformError')

// eslint-disable-next-line fp/no-let
let transport = null

/**
 * Creates and caches the transport once.
 *
 * @param {object} options in the form of `headers` and other `axios` options.
 */
const makeTransport = ({ headers: heads, ...options }) => {
  const headers = heads
    ? {
        ...defaultHeaders,
        ...heads
      }
    : defaultHeaders

  const config = {
    ...defaults,
    ...options,
    headers
  }

  transport = axios.create(config)

  // eslint-disable-next-line fp/no-unused-expression
  transport.interceptors.response.use(transformResponse, makeTransformError(transport))
  // any other config
}

const getTransport = (options = {}) => {
  // eslint-disable-next-line fp/no-unused-expression
  if (!transport) makeTransport(options)
  const get = async path => transport.get(path)
  const post = async (path, data) => transport.post(path, data)

  return { get, post }
}

const close = () => {
  transport = undefined
}

module.exports = { getTransport, close }
