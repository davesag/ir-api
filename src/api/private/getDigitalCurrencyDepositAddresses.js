const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  primaryCurrencyCode: ['isRequired']
}

const getDigitalCurrencyDepositAddresses = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    primaryCurrencyCode,
    pageIndex = defaultParams.pageIndex,
    pageSize = defaultParams.pageSize
  }) => {
    const payload = { primaryCurrencyCode, pageIndex, pageSize }
    validate(payload, validation)
    const path = 'Private/GetDigitalCurrencyDepositAddresses'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getDigitalCurrencyDepositAddresses
