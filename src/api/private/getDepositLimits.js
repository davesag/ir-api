const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetDepositLimits
const getDepositLimits = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async () => {
    const path = 'Private/GetDepositLimits'
    const { post } = getTransport()
    return post(path, buildPayload(path))
  }
}

module.exports = getDepositLimits
