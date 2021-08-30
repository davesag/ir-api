const PUBLIC = require('./api/public')
const PRIVATE = require('./api/private')
const { getTransport } = require('./utils/transport')

const attachKeys =
  (...keys) =>
  (acc, elem) => ({ ...acc, [elem]: PRIVATE[elem](...keys) })

const ir = (key, secret, config) => {
  // eslint-disable-next-line fp/no-unused-expression
  getTransport(config) // forces preload of transport.
  return key && secret
    ? {
        ...PUBLIC,
        ...Object.keys(PRIVATE).reduce(attachKeys(key, secret), {})
      }
    : PUBLIC
}

module.exports = ir
