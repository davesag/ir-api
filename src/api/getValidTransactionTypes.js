const { getTransport } = require('../utils/transport')

const { get } = getTransport()

const getValidTransactionTypes = async () =>
  get('Public/GetValidTransactionTypes')

module.exports = getValidTransactionTypes
