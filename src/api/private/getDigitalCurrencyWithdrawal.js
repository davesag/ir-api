const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  transactionGuid: ['isRequired', 'isGuid']
}

// https://www.independentreserve.com/products/api#GetDigitalCurrencyWithdrawal
const getDigitalCurrencyWithdrawal = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ transactionGuid }) => {
    const payload = { transactionGuid }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/GetDigitalCurrencyWithdrawal'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getDigitalCurrencyWithdrawal
