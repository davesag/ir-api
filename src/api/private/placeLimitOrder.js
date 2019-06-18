const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const placeLimitOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      primaryCurrencyCode: params.primaryCurrencyCode,
      secondaryCurrencyCode: params.secondaryCurrencyCode,
      orderType: params.orderType,
      price: params.price,
      volume: params.volume
    }
    const path = 'Private/PlaceLimitOrder'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = placeLimitOrder
