const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getOrderDetails = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = { orderGuid: params.orderGuid }
    const path = 'Private/GetOrderDetails'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getOrderDetails
