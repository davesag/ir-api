const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getAccounts = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async () => {
    const path = 'Private/GetAccounts'
    return post(path, buildPayload(path))
  }
}

module.exports = getAccounts
