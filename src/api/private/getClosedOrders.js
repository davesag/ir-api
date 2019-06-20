const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired']
}

const getClosedOrders = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    primaryCurrencyCode,
    secondaryCurrencyCode,
    pageIndex = defaultParams.pageIndex,
    pageSize = defaultParams.pageSize
  }) => {
    const payload = {
      primaryCurrencyCode,
      secondaryCurrencyCode,
      pageIndex,
      pageSize
    }
    validate(payload, validation)
    const path = 'Private/GetClosedOrders'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getClosedOrders
