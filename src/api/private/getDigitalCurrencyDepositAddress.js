const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

const { post } = getTransport()

const getDigitalCurrencyDepositAddress = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = { primaryCurrencyCode: params.primaryCurrencyCode }
    const path = 'Private/GetDigitalCurrencyDepositAddress'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getDigitalCurrencyDepositAddress
