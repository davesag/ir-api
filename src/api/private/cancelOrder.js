const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  orderGuid: ['isRequired']
}

const cancelOrder = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async params => {
    const payload = { orderGuid: params.orderGuid }
    validate(payload, validation)
    const path = 'Private/CancelOrder'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = cancelOrder
