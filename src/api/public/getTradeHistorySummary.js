const { encode } = require('querystring')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const { get } = getTransport()

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  numberOfHoursInThePastToRetrieve: ['isRequired', 'isPositiveNumber']
}

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
  validateFields(params, validation)
  return get(`Public/GetTradeHistorySummary?${encode(params)}`)
}

module.exports = getTradeHistorySummary
