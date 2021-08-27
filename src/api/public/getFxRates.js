const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetFxRates
const getFxRates = async () => {
  const { get } = getTransport()
  return get('Public/GetFxRates')
}

module.exports = getFxRates
