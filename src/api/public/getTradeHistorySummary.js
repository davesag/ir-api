const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  numberOfHoursInThePastToRetrieve: ['isRequired', 'isPositiveNumber']
}

// https://www.independentreserve.com/products/api#GetTradeHistorySummary
const getTradeHistorySummary = async ({
  primaryCurrencyCode,
  secondaryCurrencyCode,
  numberOfHoursInThePastToRetrieve
}) => {
  const params = {
    primaryCurrencyCode,
    secondaryCurrencyCode,
    numberOfHoursInThePastToRetrieve
  }
  // eslint-disable-next-line fp/no-unused-expression
  validateFields(params, validation)
  const { get } = getTransport()
  return get(`Public/GetTradeHistorySummary?${encode(params)}`)
}

module.exports = getTradeHistorySummary
