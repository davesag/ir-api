const { getTransport } = require('../../utils/transport')

const getValidOrderTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidOrderTypes')
}

module.exports = getValidOrderTypes
