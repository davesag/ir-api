const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetValidLimitOrderTypes
const getValidLimitOrderTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidLimitOrderTypes')
}

module.exports = getValidLimitOrderTypes
