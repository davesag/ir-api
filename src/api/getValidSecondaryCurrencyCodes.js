const { getTransport } = require('../utils/transport')

const { get } = getTransport()

const getValidSecondaryCurrencyCodes = async () =>
  get('Public/GetValidSecondaryCurrencyCodes')

module.exports = getValidSecondaryCurrencyCodes
