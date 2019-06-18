const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getClosedOrders = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      primaryCurrencyCode: params.primaryCurrencyCode,
      secondaryCurrencyCode: params.secondaryCurrencyCode,
      pageIndex: params.pageIndex || defaultParams.pageIndex,
      pageSize: params.pageSize || defaultParams.pageSize
    }
    const path = 'Private/GetClosedOrders'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getClosedOrders
