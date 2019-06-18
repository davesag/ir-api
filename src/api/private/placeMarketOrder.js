const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const placeMarketOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      primaryCurrencyCode: params.primaryCurrencyCode,
      secondaryCurrencyCode: params.secondaryCurrencyCode,
      orderType: params.orderType,
      volume: params.volume
    }
    const path = 'Private/PlaceMarketOrder'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = placeMarketOrder
