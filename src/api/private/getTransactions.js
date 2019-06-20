const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const validate = require('../../validation')

const validation = {
  accountGuid: ['isRequired'],
  fromTimestampUtc: ['isRequired'],
  toTimestampUtc: ['isRequired'],
  txTypes: ['isRequired']
}

const { post } = getTransport()

const getTransactions = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    accountGuid,
    fromTimestampUtc,
    toTimestampUtc,
    txTypes,
    pageIndex = defaultParams.pageIndex,
    pageSize = defaultParams.pageSize
  }) => {
    const payload = {
      accountGuid,
      fromTimestampUtc,
      toTimestampUtc,
      txTypes,
      pageIndex,
      pageSize
    }
    validate(payload, validation)
    const path = 'Private/GetTransactions'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getTransactions
