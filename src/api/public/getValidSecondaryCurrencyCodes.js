const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetValidSecondaryCurrencyCodes
const getValidSecondaryCurrencyCodes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidSecondaryCurrencyCodes')
}

module.exports = getValidSecondaryCurrencyCodes
