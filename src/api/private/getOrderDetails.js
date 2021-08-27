const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { validateFields } = require('../../validation')

const validation = {
  orderGuid: ['isRequired', 'isGuid']
}

// https://www.independentreserve.com/products/api#GetOrderDetails
const getOrderDetails = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ orderGuid }) => {
    const payload = { orderGuid }
    validateFields(payload, validation)
    const path = 'Private/GetOrderDetails'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getOrderDetails
