const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetValidOrderTypes
const getValidOrderTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidOrderTypes')
}

module.exports = getValidOrderTypes
