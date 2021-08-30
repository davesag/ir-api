const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  orderType: ['isRequired', 'isString'],
  price: ['isRequired', 'isPositiveNumber'],
  volume: ['isRequired', 'isPositiveNumber']
}

// https://www.independentreserve.com/products/api#PlaceLimitOrder
const placeLimitOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ primaryCurrencyCode, secondaryCurrencyCode, orderType, price, volume }) => {
    const payload = {
      primaryCurrencyCode,
      secondaryCurrencyCode,
      orderType,
      price,
      volume
    }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/PlaceLimitOrder'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = placeLimitOrder
