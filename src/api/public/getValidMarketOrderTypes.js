const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetValidMarketOrderTypes
const getValidMarketOrderTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidMarketOrderTypes')
}

module.exports = getValidMarketOrderTypes
