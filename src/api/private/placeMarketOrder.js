const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  orderType: ['isRequired', 'isString'],
  volume: ['isRequired', 'isPositiveNumber']
}

const placeMarketOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ primaryCurrencyCode, secondaryCurrencyCode, orderType, volume }) => {
    const payload = {
      primaryCurrencyCode,
      secondaryCurrencyCode,
      orderType,
      volume
    }
    validateFields(payload, validation)
    const path = 'Private/PlaceMarketOrder'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = placeMarketOrder
