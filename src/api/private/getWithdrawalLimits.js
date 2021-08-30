const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

// https://www.independentreserve.com/products/api#GetWithdrawalLimits
const getWithdrawalLimits = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async () => {
    const path = 'Private/GetWithdrawalLimits'
    const { post } = getTransport()
    return post(path, buildPayload(path))
  }
}

module.exports = getWithdrawalLimits
