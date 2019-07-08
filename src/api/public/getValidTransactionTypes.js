const { getTransport } = require('../../utils/transport')

const getValidTransactionTypes = async () => {
  const { get } = getTransport()
  return get('Public/GetValidTransactionTypes')
}
module.exports = getValidTransactionTypes
