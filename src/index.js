const PUBLIC = require('./api/public')
const PRIVATE = require('./api/private')
const { getTransport } = require('./utils/transport')

const attachKeys = (...keys) => (acc, elem) => {
  acc[elem] = PRIVATE[elem](...keys)
  return acc
}

const ir = (key, secret, config) => {
  getTransport(config)
  return key && secret
    ? {
        ...PUBLIC,
        ...Object.keys(PRIVATE).reduce(attachKeys(key, secret), {})
      }
    : PUBLIC
}

module.exports = ir
