const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetValidTransactionTypes
const getValidTransactionTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidTransactionTypes')
}

module.exports = getValidTransactionTypes
