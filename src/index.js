const getValidPrimaryCurrencyCodes = require('./api/getValidPrimaryCurrencyCodes')
const getOpenOrders = require('./api/getOpenOrders')

const publicMethods = {
  getValidPrimaryCurrencyCodes
}

const privateMethods = {
  getOpenOrders
}

const attachKeys = (...keys) => (acc, elem) => {
  acc[elem] = privateMethods[elem](...keys)
  return acc
}

const ir = (key, secret) =>
  key && secret
    ? {
        ...publicMethods,
        ...Object.keys(privateMethods).reduce(attachKeys(key, secret), {})
      }
    : publicMethods

module.exports = ir
