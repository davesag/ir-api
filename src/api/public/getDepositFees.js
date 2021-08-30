const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetDepositFees
const getDepositFees = async () => {
  const { get } = getTransport()
  return get('Public/GetDepositFees')
}

module.exports = getDepositFees
