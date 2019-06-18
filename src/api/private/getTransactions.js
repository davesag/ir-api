const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getTransactions = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      accountGuid: params.accountGuid,
      fromTimestampUtc: params.fromTimestampUtc,
      toTimestampUtc: params.toTimestampUtc,
      txTypes: params.txTypes,
      pageIndex: params.pageIndex || defaultParams.pageIndex,
      pageSize: params.pageSize || defaultParams.pageSize
    }
    const path = 'Private/GetTransactions'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getTransactions
