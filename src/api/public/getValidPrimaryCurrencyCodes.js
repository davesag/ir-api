const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetValidPrimaryCurrencyCodes
const getValidPrimaryCurrencyCodes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidPrimaryCurrencyCodes')
}

module.exports = getValidPrimaryCurrencyCodes
