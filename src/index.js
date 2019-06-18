const PUBLIC = require('./api/public')
const PRIVATE = require('./api/private')

const attachKeys = (...keys) => (acc, elem) => {
  acc[elem] = PRIVATE[elem](...keys)
  return acc
}

const ir = (key, secret) =>
  key && secret
    ? {
        ...PUBLIC,
        ...Object.keys(PRIVATE).reduce(attachKeys(key, secret), {})
      }
    : PUBLIC

module.exports = ir
