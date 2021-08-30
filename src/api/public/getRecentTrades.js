const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  numberOfRecentTradesToRetrieve: ['isRequired', 'isPositiveNumber']
}

// https://www.independentreserve.com/products/api#GetRecentTrades
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
  // eslint-disable-next-line fp/no-unused-expression
  validateFields(params, validation)
  const { get } = getTransport()
  return get(`Public/GetRecentTrades?${encode(params)}`)
}

module.exports = getRecentTrades
