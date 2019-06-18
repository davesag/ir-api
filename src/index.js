const getValidPrimaryCurrencyCodes = require('./api/getValidPrimaryCurrencyCodes')
const getOpenOrders = require('./api/getOpenOrders')

const publicMethods = {
  getValidPrimaryCurrencyCodes
}

const privateMethods = {
  getOpenOrders
}

const ir = (key, secret) =>
  key && secret
    ? {
        ...publicMethods,
        ...Object.keys(privateMethods).reduce((acc, elem) => {
          acc[elem] = privateMethods[elem](key, secret)
          return acc
        }, {})
      }
    : publicMethods

module.exports = ir
