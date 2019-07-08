const { getTransport } = require('../../utils/transport')

const getValidLimitOrderTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidLimitOrderTypes')
}

module.exports = getValidLimitOrderTypes
