const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const validate = require('../../validation')

const { post } = getTransport()

const validation = {
  orderGuid: ['isRequired', 'isGuid']
}

const getOrderDetails = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ orderGuid }) => {
    const payload = { orderGuid }
    validate(payload, validation)
    const path = 'Private/GetOrderDetails'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getOrderDetails
