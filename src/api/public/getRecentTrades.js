const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { get } = getTransport()

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
  validate(params, validation)
  return get(`Public/GetRecentTrades?${encode(params)}`)
}

module.exports = getRecentTrades
