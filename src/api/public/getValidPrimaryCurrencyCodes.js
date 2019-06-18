const { getTransport } = require('../../utils/transport')

const { get } = getTransport()

const getValidPrimaryCurrencyCodes = async () =>
  get('Public/GetValidPrimaryCurrencyCodes')

module.exports = getValidPrimaryCurrencyCodes
