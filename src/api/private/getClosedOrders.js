const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')
const { validateFields } = require('../../validation')
const isPositiveNumber = require('../../validation/isPositiveNumber')

const validation = {
  primaryCurrencyCode: ['isRequired'],
  secondaryCurrencyCode: ['isRequired'],
  pageIndex: ['isPositiveNumber'],
  pageSize: [isPositiveNumber(50)]
}

const getClosedOrders = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async ({
    primaryCurrencyCode,
    secondaryCurrencyCode,
    pageIndex = defaultParams.pageIndex,
    pageSize = defaultParams.pageSize
  }) => {
    const payload = {
      primaryCurrencyCode,
      secondaryCurrencyCode,
      pageIndex,
      pageSize
    }
    validateFields(payload, validation)
    const path = 'Private/GetClosedOrders'
    const { post } = getTransport()
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getClosedOrders
