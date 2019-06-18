const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getBrokerageFees = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async () => {
    const path = 'Private/GetBrokerageFees'
    return post(path, buildPayload(path))
  }
}

module.exports = getBrokerageFees
