const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getValidMarketOrderTypes = async () =>
  get('Public/GetValidMarketOrderTypes')

module.exports = getValidMarketOrderTypes
