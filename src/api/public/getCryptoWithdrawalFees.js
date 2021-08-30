const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetCryptoWithdrawalFees
const getCryptoWithdrawalFees = async () => {
  const { get } = getTransport()
  return get('Public/GetCryptoWithdrawalFees')
}

module.exports = getCryptoWithdrawalFees
