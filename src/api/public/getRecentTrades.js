const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  numberOfRecentTradesToRetrieve: ['isRequired', 'isPositiveNumber']
}

const getRecentTrades = async ({
  primaryCurrencyCode,
  secondaryCurrencyCode,
  numberOfRecentTradesToRetrieve
}) => {
  const params = {
    primaryCurrencyCode,
    secondaryCurrencyCode,
    numberOfRecentTradesToRetrieve
  }
  validateFields(params, validation)
  const { get } = getTransport()
  return get(`Public/GetRecentTrades?${encode(params)}`)
}

module.exports = getRecentTrades
