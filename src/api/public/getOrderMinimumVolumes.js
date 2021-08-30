const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetOrderMinimumVolumes
const getOrderMinimumVolumes = async () => {
  const { get } = getTransport()
  return get('Public/GetOrderMinimumVolumes')
}

module.exports = getOrderMinimumVolumes
