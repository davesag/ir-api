const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')
const isOneOf = require('../../validation/isOneOf')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  orderType: ['isRequired', 'isString'],
  volume: ['isRequired', 'isPositiveNumber'],
  volumeCurrencyType: [isOneOf(['Primary', 'Secondary'])]
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
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/PlaceMarketOrder'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = placeMarketOrder
