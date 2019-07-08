const { getTransport } = require('../../utils/transport')

const getValidSecondaryCurrencyCodes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidSecondaryCurrencyCodes')
}
module.exports = getValidSecondaryCurrencyCodes
