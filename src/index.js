const PUBLIC = {
  getAllOrders: require('./api/public/getAllOrders'),
  getFxRates: require('./api/public/getFxRates'),
  getMarketSummary: require('./api/public/getMarketSummary'),
  getOrderBook: require('./api/public/getOrderBook'),
  getRecentTrades: require('./api/public/getRecentTrades'),
  getTradeHistorySummary: require('./api/public/getTradeHistorySummary'),
  getValidLimitOrderTypes: require('./api/public/getValidLimitOrderTypes'),
  getValidMarketOrderTypes: require('./api/public/getValidMarketOrderTypes'),
  getValidOrderTypes: require('./api/public/getValidOrderTypes'),
  getValidPrimaryCurrencyCodes: require('./api/public/getValidPrimaryCurrencyCodes'),
  getValidSecondaryCurrencyCodes: require('./api/public/getValidSecondaryCurrencyCodes'),
  getValidTransactionTypes: require('./api/public/getValidTransactionTypes')
}

const PRIVATE = {
  getOpenOrders: require('./api/private/getOpenOrders')
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
