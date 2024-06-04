const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const { validateFields } = require('../../validation')
const isPositiveNumber = require('../../validation/isPositiveNumber')
const isTime = require('../../validation/isTime')
const isOneOf = require('../../validation/isOneOf')

const validation = {
  accountGuid: ['isRequired', 'isGuid'],
  pageIndex: ['isPositiveNumber'],
  pageSize: [isPositiveNumber(5000)],
  includeTotals: [isOneOf(['true', 'false'])]
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
    pageSize = defaultParams.pageSize,
    includeTotals = 'true'
  }) => {
    const payload = {
      accountGuid,
      fromTimestampUtc,
      toTimestampUtc,
      txTypes,
      pageIndex,
      pageSize,
      includeTotals
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
