const { getTransport } = require('../../utils/transport')

const getValidPrimaryCurrencyCodes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidPrimaryCurrencyCodes')
}
module.exports = getValidPrimaryCurrencyCodes
