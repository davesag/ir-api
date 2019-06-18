module.exports = {
  cancelOrder: require('./cancelOrder'),
  getAccounts: require('./getAccounts'),
  getBrokerageFees: require('./getBrokerageFees'),
  getClosedFilledOrders: require('./getClosedFilledOrders'),
  getClosedOrders: require('./getClosedOrders'),
  getDigitalCurrencyDepositAddress: require('./getDigitalCurrencyDepositAddress'),
  getDigitalCurrencyDepositAddresses: require('./getDigitalCurrencyDepositAddresses'),
  getOpenOrders: require('./getOpenOrders'),
  getOrderDetails: require('./getOrderDetails'),
  getTrades: require('./getTrades'),
  getTransactions: require('./getTransactions'),
  placeLimitOrder: require('./placeLimitOrder'),
  placeMarketOrder: require('./placeMarketOrder'),
  requestFiatWithdrawal: require('./requestFiatWithdrawal'),
  synchDigitalCurrencyDepositAddressWithBlockchain: require('./synchDigitalCurrencyDepositAddressWithBlockchain'),
  withdrawDigitalCurrency: require('./withdrawDigitalCurrency')
}
