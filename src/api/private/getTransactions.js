const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const { validateFields } = require('../../validation')
const isPositiveNumber = require('../../validation/isPositiveNumber')
const isTime = require('../../validation/isTime')

const validation = {
  accountGuid: ['isRequired', 'isGuid'],
  pageIndex: ['isPositiveNumber'],
  pageSize: [isPositiveNumber(50)]
}

// https://www.independentreserve.com/products/api#GetTransactions
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
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, {
      ...validation,
      fromTimestampUtc: ['isRequired', isTime({ before: toTimestampUtc })],
      toTimestampUtc: ['isRequired', isTime({ after: fromTimestampUtc })]
    })
    const path = 'Private/GetTransactions'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getTransactions
