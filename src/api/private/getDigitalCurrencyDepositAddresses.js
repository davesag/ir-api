const payloadBuilder = require('../../utils/payloadBuilder')
const { getTransport } = require('../../utils/transport')
const { defaultParams } = require('../../defaults')

const { post } = getTransport()

const getDigitalCurrencyDepositAddresses = (apiKey, apiSecret) => {
  const buildPayload = payloadBuilder(apiKey, apiSecret)

  return async (params = {}) => {
    const payload = {
      primaryCurrencyCode: params.primaryCurrencyCode,
      pageIndex: params.pageIndex || defaultParams.pageIndex,
      pageSize: params.pageSize || defaultParams.pageSize
    }
    const path = 'Private/GetDigitalCurrencyDepositAddresses'
    return post(path, buildPayload(path, payload))
  }
}

module.exports = getDigitalCurrencyDepositAddresses
