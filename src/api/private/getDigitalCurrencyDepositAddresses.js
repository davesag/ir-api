const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const { validateFields } = require('../../validation')
const isPositiveNumber = require('../../validation/isPositiveNumber')

const { post } = getTransport()

const validation = {
  primaryCurrencyCode: ['isRequired'],
  pageIndex: ['isPositiveNumber'],
  pageSize: [isPositiveNumber(50)]
}

const getDigitalCurrencyDepositAddresses = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    primaryCurrencyCode,
    pageIndex = defaultParams.pageIndex,
    pageSize = defaultParams.pageSize
  }) => {
    const payload = { primaryCurrencyCode, pageIndex, pageSize }
    validateFields(payload, validation)
    const path = 'Private/GetDigitalCurrencyDepositAddresses'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getDigitalCurrencyDepositAddresses
