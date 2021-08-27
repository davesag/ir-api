const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  orderType: ['isRequired', 'isString'],
  volume: ['isRequired', 'isPositiveNumber'],
  volumeCurrencyType: ['isString']
}

// https://www.independentreserve.com/products/api#PlaceMarketOrder
const placeMarketOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    primaryCurrencyCode,
    secondaryCurrencyCode,
    orderType,
    volume,
    volumeCurrencyType
  }) => {
    const payload = {
      primaryCurrencyCode,
      secondaryCurrencyCode,
      orderType,
      volume,
      volumeCurrencyType
    }
    validateFields(payload, validation)
    const path = 'Private/PlaceMarketOrder'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = placeMarketOrder
