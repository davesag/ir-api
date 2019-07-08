const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

const getAccounts = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async () => {
    const path = 'Private/GetAccounts'
    const { post } = getTransport()
    return post(path, buildPayload(path))
  }
}

module.exports = getAccounts
