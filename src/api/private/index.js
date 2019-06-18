module.exports = {
  getAccounts: require('./getAccounts'),
  getBrokerageFees: require('./getBrokerageFees'),
  getClosedOrders: require('./getClosedOrders'),
  getClosedFilledOrders: require('./getClosedFilledOrders'),
  getDigitalCurrencyDepositAddress: require('./getDigitalCurrencyDepositAddress'),
  getDigitalCurrencyDepositAddresses: require('./getDigitalCurrencyDepositAddresses'),
  getOpenOrders: require('./getOpenOrders'),
  getOrderDetails: require('./getOrderDetails'),
  getTrades: require('./getTrades'),
  getTransactions: require('./getTransactions'),
  requestFiatWithdrawal: require('./requestFiatWithdrawal'),
  synchDigitalCurrencyDepositAddressWithBlockchain: require('./synchDigitalCurrencyDepositAddressWithBlockchain'),
  withdrawDigitalCurrency: require('./withdrawDigitalCurrency')
}
