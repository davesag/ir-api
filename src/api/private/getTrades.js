const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getTrades = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      pageIndex: params.pageIndex || defaultParams.pageIndex,
      pageSize: params.pageSize || defaultParams.pageSize
    }
    const path = 'Private/GetTrades'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getTrades
