const PUBLIC = {
  getFxRates: require('./api/getFxRates'),
  getValidLimitOrderTypes: require('./api/getValidLimitOrderTypes'),
  getValidMarketOrderTypes: require('./api/getValidMarketOrderTypes'),
  getValidOrderTypes: require('./api/getValidOrderTypes'),
  getValidPrimaryCurrencyCodes: require('./api/getValidPrimaryCurrencyCodes'),
  getValidSecondaryCurrencyCodes: require('./api/getValidSecondaryCurrencyCodes'),
  getValidTransactionTypes: require('./api/getValidTransactionTypes')
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
