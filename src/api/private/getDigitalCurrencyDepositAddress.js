const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  primaryCurrencyCode: ['isRequired']
}

const getDigitalCurrencyDepositAddress = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ primaryCurrencyCode }) => {
    const payload = { primaryCurrencyCode }
    validate(payload, validation)
    const path = 'Private/GetDigitalCurrencyDepositAddress'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getDigitalCurrencyDepositAddress
