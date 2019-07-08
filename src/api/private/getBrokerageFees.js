const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')

const getBrokerageFees = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async () => {
    const path = 'Private/GetBrokerageFees'
    const { post } = getTransport()
    return post(path, buildPayload(path))
  }
}

module.exports = getBrokerageFees
