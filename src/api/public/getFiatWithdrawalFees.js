const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetFiatWithdrawalFees
const getFiatWithdrawalFees = async () => {
  const { get } = getTransport()
  return get('Public/GetFiatWithdrawalFees')
}

module.exports = getFiatWithdrawalFees
