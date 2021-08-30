const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  fiatWithdrawalRequestGuid: ['isRequired', 'isGuid']
}

// https://www.independentreserve.com/products/api#GetFiatWithdrawal
const getFiatWithdrawal = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ fiatWithdrawalRequestGuid }) => {
    const payload = { fiatWithdrawalRequestGuid }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/GetFiatWithdrawal'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getFiatWithdrawal
