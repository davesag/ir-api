const { getTransport } = require('../../utils/transport')

const getValidMarketOrderTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidMarketOrderTypes')
}

module.exports = getValidMarketOrderTypes
