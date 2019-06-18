const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getValidLimitOrderTypes = async () =>
  get('Public/GetValidLimitOrderTypes')

module.exports = getValidLimitOrderTypes
