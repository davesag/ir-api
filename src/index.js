const PUBLIC = {
  getValidLimitOrderTypes: require('./api/getValidLimitOrderTypes'),
  getValidMarketOrderTypes: require('./api/getValidMarketOrderTypes'),
  getValidPrimaryCurrencyCodes: require('./api/getValidPrimaryCurrencyCodes'),
  getValidSecondaryCurrencyCodes: require('./api/getValidSecondaryCurrencyCodes')
}

const PRIVATE = {
  getOpenOrders: require('./api/getOpenOrders')
}

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
