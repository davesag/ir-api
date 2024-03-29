const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const { validateFields } = require('../../validation')
const isPositiveNumber = require('../../validation/isPositiveNumber')

const validation = {
  pageIndex: ['isPositiveNumber'],
  pageSize: [isPositiveNumber(50)]
}

// https://www.independentreserve.com/products/api#GetTrades
const getTrades = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({ pageIndex = defaultParams.pageIndex, pageSize = defaultParams.pageSize }) => {
    const payload = { pageIndex, pageSize }
    // eslint-disable-next-line fp/no-unused-expression
    validateFields(payload, validation)
    const path = 'Private/GetTrades'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getTrades
